class OptionTypesProduct < ApplicationRecord
  belongs_to :option_type
  belongs_to :product
end
