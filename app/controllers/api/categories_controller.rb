class Api::CategoriesController < Admin::ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_category, only: [:destroy]

  def index
    categories = Category.includes(:category_color).order(created_at: :desc)

    render json: categories.map { |category|
      {
        id: category.id,
        name: category.name,
        description: category.description,
        avatar: category.avatar,
        category_color: category.category_color&.as_json(only: [:name, :code]),
        created_at: category.created_at,
        updated_at: category.updated_at
      }
    }, status: :ok  
  end

  def create
    if params[:avatar]
      begin
        # Upload the image to Cloudinary
        uploaded_image = Cloudinary::Uploader.upload(params[:avatar])
        avatar_url = uploaded_image['secure_url'] # Get the URL of the uploaded image
  
        # Parse the category_color if it's provided as a string
        category_color = nil
        if params[:category_color].present?
          category_color = JSON.parse(params[:category_color]) rescue nil
        end
  
        @category = Category.new(category_params.merge(avatar: avatar_url))
  
        if @category.save
          if category_color
            @category.create_category_color!(name: category_color['name'], code: category_color['code'])
          end
  
          render json: @category, status: :created
        else
          render json: @category.errors, status: :unprocessable_entity
        end
      rescue Cloudinary::Api::Error => e
        render json: { error: e.message }, status: :unprocessable_entity
      end
    else
      render json: { message: "No image provided" }, status: :bad_request
    end
  end  

  def destroy
    @category = Category.find_by(id: params[:id])

    if @category
      if @category.avatar.present?
        public_id = @category.avatar.split('/').last.split('.').first
        Cloudinary::Uploader.destroy(public_id)
      end

      @category.destroy
      render json: { message: 'Category deleted successfully' }, status: :ok
    else
      render json: { message: 'Category not found' }, status: :not_found
    end 
  end

  private 

  def category_params
    params.permit(:name, :description, :avatar)
  end

  # def category_color_params
  #   params.require(:category_color).permit(:name, :code)
  # end

  def set_category
    @category = Category.includes(:category_color).find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Category not found' }, status: :not_found
  end

  def save_category_color(category)
    color_params = category_color_params
    if category.category_color
      category.category_color.update!(color_params)
    else
      category.create_category_color!(color_params)
    end
  end
end
