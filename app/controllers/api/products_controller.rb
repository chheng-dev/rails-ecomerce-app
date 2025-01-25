class Api::ProductsController < Api::ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_product, only: [:show, :edit, :update, :destroy]

  def index
    products = Api::ProductSearchService.new(params).call

    render json: {
      success: true,
      type: 'products',
      attributes: products
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

      @product.create_product_stock!(stock: params[:stock]) if params[:stock].present?

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

  def batch_destroy 
    product_ids = batch_destroy_product_params[:product_ids]

    if product_ids.blank?
      render json: {
        success: false,
        message: 'No Product Ids provided'
      }, status: :unprocessable_entity
    end

    products = Product.where(id: product_ids);
    
    if products.destroy_all
      render json: {
        success: true,
        message: 'Product deleted successfully'
      }, status: :ok 
    else 
      render json: {
        success: false,
        message: 'Failed to delete products'
      }, status: :unprocessable_entity
    end
  end

  def option_types_by_product
    result = Api::ProductOptionTypesService.new(params[:id]).call

    if result.empty?
      render json: {
        success: false,
        message: result
      }, status: :not_found
    else
      render json: {
        success: true,
        option_types: result
      }, status: :ok
    end
  end

  def update_stock
    product = Product.find(params[:id])
    stock_quantity = params[:stock].to_i

    if stock_quantity >= 0
      ProductStockService.update_stock(product.id, stock_quantity).call
      render json: {
        success: true,
        message: 'Product stock updated successfully.',
        attributes: {
          type: 'product_stock',
          product: product,
          stock_quantity: stock_quantity
        }
      }, status: :ok
    else
      render json: {
        success: false,
        message: 'Invalid stock quantity'
      }, status: :unprocessable_entity 
    end
  end

  def update_multiple_stocks
    product_ids = params[:product_id]
    stock_quantity = params[:stock].to_i

    if product_ids.present? && stock_quantity.present?
      begin
        Api::ProductStockService.update_multiple_stocks(product_ids, stock_quantity).call

        render json: {
          success: true,
          message: 'Product stocks updated successfully for all products'
        }, status: :ok
      rescue ActiveRecord::RecordNotFound => e 
        render json: {
          success: false,
          message: "One or more product not found: #{e.message}"
        }, status: :not_found
      rescue StandardError => e 
        render json: {
          success: false,
          message: "Error updating stocks: #{e.message}"
        }, status: :unprocessable_entity
      end
    else 
      render json: {
        success: false,
        message: 'Invalid or missing products data'
      }, status: :unprocessable_entity
    end
  end

  def update_published_status 
    product = Product.find(params[:id])
    is_published = params[:is_published]

    if product.update(is_published: is_published)
      render json: {
        success: true,
        message: 'Product published status updated successfully',
      }, status: :ok
    else
      render json: {
        success: false,
        message: 'Failed to update product published status',
        errors: product.errors.full_messages
      }, status: :unprocessable_entity
    end
  end


  private 

  def create_product_prices
    return unless price
  end

  def set_product
    @product = Product.find(params[:id])
  end

  def product_params
    params.permit(
      :name, 
      :description, 
      :category_id, 
      :brand_id,
      :weight,
      :status,
      :gender,
      :tag,
      :tex,
      :discount,
      :tag_number,
      :amount,
      :sale_amount,
      :compare_amount,
      :currency
    )
  end

  def batch_destroy_product_params 
    params.permit(product_ids: [])
  end
end
