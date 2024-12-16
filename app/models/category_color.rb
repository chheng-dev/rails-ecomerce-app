class CategoryColor < ApplicationRecord
  belongs_to :category

  validates :name, :code, presence: true #uniqueness: true
end
