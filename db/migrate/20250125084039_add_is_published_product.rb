class AddIsPublishedProduct < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :is_published, :boolean, default: true
  end
end
