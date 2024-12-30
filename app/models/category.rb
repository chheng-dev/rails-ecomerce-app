class Category < ApplicationRecord
  # has_one_attached :avatar

  has_one :category_color, dependent: :destroy
  accepts_nested_attributes_for :category_color

  validates :name, presence: true

  before_destroy :destroy_avatar_from_cloudinary

  def avatar_url
    Cloudinary::Utils.cloudinary_url(avatar.key) if avatar.attached?
  end

  def destroy_avatar_from_cloudinary
    if avatar.present?
      public_id = avatar.split('/').last.split('.').first
      Cloudinary::Uploader.destroy(public_id)
    end
  end

end
