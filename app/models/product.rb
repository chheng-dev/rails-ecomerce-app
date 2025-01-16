class Product < ApplicationRecord
  belongs_to :category
  belongs_to :brand
  has_many :product_images, dependent: :destroy
  accepts_nested_attributes_for :product_images

  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :stock, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  before_validation :generate_slug, on: :create

  def generate_slug
    self.slug ||= name.parameterize if name.present?
  end

end
