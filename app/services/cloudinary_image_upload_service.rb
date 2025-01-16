class CloudinaryImageUploadService
  def self.uploaded_images(images)
    Array.wrap(images).map do |image|
      uploaded_image = Cloudinary::Uploader.upload(image)
      uploaded_image['secure_url']
    end
  rescue => e
    Rails.logger.error("Cloudinary upload error: #{e.message}")
    []
  end
end
