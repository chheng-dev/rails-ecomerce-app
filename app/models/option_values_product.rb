class OptionValuesProduct < ApplicationRecord
  belongs_to :product
  belongs_to :option_value
end
