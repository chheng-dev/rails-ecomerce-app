class Product < ApplicationRecord
  belongs_to :category
  belongs_to :brand
  has_many :product_images, dependent: :destroy
  has_many :option_types_products, dependent: :destroy
  has_many :option_types, through: :option_types_products
  has_many :option_values_products, dependent: :destroy
  has_many :option_values, through: :option_values_products
  has_one :product_stock, dependent: :destroy

  accepts_nested_attributes_for :product_images

  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true
  validates :amount, :sale_amount, :compare_amount, numericality: { greater_than_or_equal_to: 0 }
  validates :currency, inclusion: { in: ['USD', 'RIEL'], message: "%{value} is not a valid currency" }

  before_validation :generate_slug, on: :create

  def generate_slug
    self.slug ||= name.parameterize if name.present?
  end
  
end
