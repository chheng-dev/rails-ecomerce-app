class Api::ProductsController < Api::ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_product, only: [:show, :edit, :update, :destroy]

  def index
    products = Product.includes(:category, :brand, :product_images).order(created_at: :desc).all
    
    render json: {
      success: true,
      type: 'products',
      attributes: products.map do |product|
        {
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category: product.category.name,
          brand: product.brand.name,
          weight: product.weight,
          status: product.status,
          gender: product.gender,
          tag: product.tag,
          tex: product.tex,
          discount: product.discount,
          tag_number: product.tag_number,
          images: product.product_images.map do |image|
            {
              id: image.id,
              url: image.image_url,
              is_active: image.is_active
            }
          end,
          option_types: product.option_types.map do |opt|
            {
              id: opt.id,
              name: opt.name,
              presentation: opt.presentation,
              option_values: opt.option_values.map do |option_value|
                {
                  id: option_value.id,
                  name: option_value.name,
                  presentation: option_value.presentation
                }
              end
            }
          end,
          created_at: product.created_at,
          updated_at: product.updated_at
        }
      end
    }, status: :ok
  rescue StandardError => e 
      render json: {
        success: false,
        error: e.message
      }, status: :internal_server_error
  end

  def create
    @product = Product.new(product_params)

    if @product.save
      if params[:option_type_ids].present?
        option_types = OptionType.where(id: params[:option_type_ids])
        option_types.each do |option_type|
          @product.option_types_products.create(option_type: option_type)
        end
      end

      if params[:option_value_ids].present?
        option_values = OptionValue.where(id: params[:option_value_ids])
        option_values.each do |option_value|
          @product.option_values_products.create(option_value: option_value)
        end
      end

      if params[:images].present?
        images = Array.wrap(params[:images]) 
        image_urls = CloudinaryImageUploadService.uploaded_images(images)

        image_urls.each_with_index do |url, index|
          is_active = (index === image_urls.length - 1)
          @product.product_images.create(image_url: url, is_active: is_active)
        end if image_urls.any?
      end

      render json: {
        success: true,
        message: 'Product created successfully!',
        product: @product.as_json(include: {
          option_types: { only: [:id, :name, :presentation] },
          option_values: { only: [:id, :name, :presentation] }
        }),
        images: @product.product_images
      }, status: :created
    else
      render json: {
        success: false,
        errors: @product.errors.full_messages
      }, status: :unprocessable_entity
    end
  end  

  def destroy
    if @product.destroy
      render json: {
        success: true,
        message: 'Product and associated data deleted successfully'
      }, status: :ok
    else 
      render json: {
        success: false,
        message: 'Failed to delete product',
        errors: @product.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private 

  def set_product
    @product = Product.find(params[:id])
  end

  def product_params
    params.permit(
      :name, 
      :description, 
      :price, 
      :stock, 
      :category_id, 
      :brand_id,
      :weight,
      :status,
      :gender,
      :tag,
      :tex,
      :discount,
      :tag_number
    )
  end
end
