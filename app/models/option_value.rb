class OptionValue < ApplicationRecord
  belongs_to :option_type
  has_many :option_values_products
  has_many :products, through: :option_values_products

end