class ProductImage < ApplicationRecord
  belongs_to :product

  validates :is_active, inclusion: { in: [true, false] }
  validates :image_url, presence: true
end