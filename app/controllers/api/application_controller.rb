class Api::ApplicationController < ApplicationController

  def uploaded_image(image)
    uploaded_image = Cloudinary::Uploader.upload(image)
    uploaded_image['secure_url']
  rescue Cloudinary::Api::Error => e
    render json: {
      success: false,
      error: "Image upload failed: #{e.message}"
    }, status: :unprocessable_entity
  end

  def remove_old_image(image_url)
    public_id = image_url.split("/").last.split(".").first 
  
    begin
      Cloudinary::Uploader.destroy(public_id)  
    rescue Cloudinary::Api::Error => e
      Rails.logger.error "Cloudinary image delete failed: #{e.message}"
    end
  end
  
end
