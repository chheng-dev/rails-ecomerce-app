class OptionType < ApplicationRecord
  has_many :option_values, dependent: :destroy
  has_many :option_types_products
  has_many :products, through: :option_types_products

  accepts_nested_attributes_for :option_values, allow_destroy: true
end