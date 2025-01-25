# module Api
#   class ProductCreationService
#     def initialize(product_params)
#       @params = product_params
#       @errors = []
#     end

#     def call
#       ActiveRecord::Base.transaction do
#         create_product
#         create_stock if @params[:stock].present?
#         assign_option_types if @params[:option_type_ids].present?
#         assign_option_values if @params[:option_value_ids].present?
#         upload_images if @params[:images].present?

#         raise ActiveRecord::Rollback if @errors.any?
#       end

#       success_response
#     rescue => e
#       error_response(e)
#     end

#     private

#     def create_product
#       @product = Product.new(@params)
#       unless @product.save
#         @errors += @product.errors.full_messages
#       end
#     end

#     def create_stock
#       @product.create_product_stock!(stock: @params[:stock])
#     rescue => e
#       @errors << e.message
#     end

#     def assign_option_types
#       OptionType.where(id: @params[:option_type_ids]).each do |option_type|
#         @product.option_types_products.create!(option_type: option_type)
#       rescue => e
#         @errors << e.message
#       end
#     end

#     def assign_option_values
#       OptionValue.where(id: @params[:option_value_ids]).each do |option_value|
#         @product.option_values_products.create!(option_value: option_value)
#       rescue => e
#         @errors << e.message
#       end
#     end

#     def upload_images
#       images = Array.wrap(@params[:images])
#       image_urls = CloudinaryImageUploadService.uploaded_images(images)

#       image_urls.each_with_index do |url, index|
#         is_active = (index == image_urls.length - 1)
#         @product.product_images.create(image_url: url, is_active: is_active)
#       end if image_urls.any?
#     rescue => e
#       @errors << e.message
#     end

#     def success_response
#       {
#         success: true,
#         product: @product,
#         message: 'Product created successfully!',
#         images: @product.product_images
#       }
#     end

#     def error_response(exception)
#       {
#         success: false,
#         message: 'An error occurred',
#         error: exception.message
#       }
#     end
#   end
# end
