class Admin::BrandsController < Admin::ApplicationController
  def edit
    @brand = Brand.friendly.find(params[:id])
  end
end
