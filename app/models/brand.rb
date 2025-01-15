class Brand < ApplicationRecord
  extend FriendlyId

  # Generate the slug from the name field
  friendly_id :name, use: :slugged

  validates :name, presence: true, uniqueness: true

  def should_generate_new_friendly_id?
    name_changed? || super
  end
end
