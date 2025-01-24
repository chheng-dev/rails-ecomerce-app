class ProductStock < ApplicationRecord
  belongs_to :product

  validates :stock, numericality: { greater_than_or_equal_to: 0 }
end
