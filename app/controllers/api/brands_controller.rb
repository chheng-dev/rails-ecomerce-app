class Api::BrandsController < Api::BaseController
  skip_before_action :verify_authenticity_token, only: [:create, :destroy]
  before_action :set_brand, only: [:edit, :update, :destroy]

  def index 
    brands = Brand.order(created_at: :desc)

    render json: {
      success: true,
      message: "Success!",
      brands: brands,
    }, status: :ok
  end

  def create  
    @brand = Brand.new(brand_params)

    if @brand.save 
      if params[:image].present?
        image_url = uploaded_image(params[:image])

        if image_url
          @brand.update(image: image_url)
        else
          @brand.destroy
          return render json: {
            success: false,
            error: 'Image upload failed'
          }, status: :unprocessable_entity
        end
      end

      render json: { 
        success: true,
        message: 'Brand created successfully!',
        brand: @brand
      }, status: :created
    else
      render json: { 
        success: false,
        errors: @brand.errors.full_messages
      }, status: :unprocessable_entity  
    end
  end

  def edit;end

  def update
    if @brand.name != brand_params[:name]
      @brand.slug = nil
    end

    if params[:image].present?
      image_url = uploaded_image(params[:image])
      
      if image_url
        remove_old_image(@brand.image) if @brand.image.present?

        @brand.update(image: image_url)
      else 
        render json:{
          success: false,
          message: 'Image upload failed.'
        }, status: :unprocessable_entity and return
      end
    end

    if @brand.update(brand_params)
      render json: {
        success: true,
        message: 'Brand updated successfully.',
        brand: @brand
      }, status: :ok
    else
      render json:{
        success: false,
        errors: @brand.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def destroy
    if @brand
      if @brand.image.present?
        remove_old_image(@brand.image)
      end

      @brand.destroy
      
      render json: {
        success: true,
        message: 'Brand has been deleted successfully.'
      }, status: :ok
    else
      render json: {
        success: false,
        errors: 'Brand not found'
      }, status: :not_found
    end
  end

  private 

  def set_brand
    @brand = Brand.friendly.find(params[:id])
    unless @brand
      render json: {
        success: false,
        errors: 'Brand not found.'
      }, status: :not_found
    end
  end
  
  def brand_params 
    params.require(:brand).permit(:name, :description)
  end
end
