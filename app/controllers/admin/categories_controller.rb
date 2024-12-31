class Admin::CategoriesController < Admin::ApplicationController
  def index 
    
  end
  def new
    
  end

  def edit
    @category = Category.includes(:category_color).find_by!(id: params[:id])
  end
end
