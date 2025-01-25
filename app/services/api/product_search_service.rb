module Api 
  class ProductSearchService
    def initialize(params)
      @params = params
      @products = Product.includes(:category, :brand, :product_images).order(created_at: :desc).all
    end
  
    def call
      apply_filter
      format_products
    end
  
    private 
  
    def apply_filter 
      @products = @products.where(brand_id: @params[:brand_id]) if @params[:brand_id].present?
      @products = @products.where(category_id: @params[:category_id]) if @params[:category_id].present?
  
      if @params[:start_date].present? && @params[:end_date].present?
        start_date = Date.parse(@params[:start_date])
        end_date = Date.parse(@params[:end_date])
        @products = @products.where("DATE(created_at) BETWEEN ? AND ?", start_date, end_date)
      elsif @params[:start_date].present?
        start_date = Date.parse(@params[:start_date])
        @products = @products.where('DATE(created_at) >= ?', start_date)
      elsif @params[:end_date].present?
        end_date = Date.parse(@params[:end_date])
        @products = @products.where('DATE(updated_at) <= ?', end_date)
      end
      @products = @products.where('products.name ILIKE ?', "%#{@params[:product_name]}%") if @params[:product_name].present?
  
    end 
  
    def format_products
      @products.map do |product|
        {
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description,
          category: product.category.name,
          brand: product.brand.name,
          weight: product.weight,
          status: product.status,
          gender: product.gender,
          tag: product.tag,
          tex: product.tex,
          discount: product.discount,
          price: product.amount,
          sale_price: product.amount,
          compare_price: product.compare_amount,
          currency: product.currency,
          is_published: product.is_published,
          tag_number: product.tag_number,
          stock: product.product_stock ? product.product_stock.stock : 0,
          images: product.product_images.map { |image| image_attributes(image) },
          option_types: product.option_types.map { |opt| option_type_attributes(opt) },
          created_at: product.created_at,
          updated_at: product.updated_at
        }
      end
    end
  
    def image_attributes(image)
      {
        id: image.id,
        url: image.image_url,
        is_active: image.is_active
      }
    end
  
    def option_type_attributes(opt)
      {
        id: opt.id,
        name: opt.name,
        presentation: opt.presentation,
        attributes: {
          type: opt.presentation.downcase,
          option_values: opt.option_values.map { |option_value| option_value_attributes(option_value) }
        }
      }
    end
  
    def option_value_attributes(option_value)
      {
        id: option_value.id,
        name: option_value.name,
        presentation: option_value.presentation
      }
    end
  
  end
end