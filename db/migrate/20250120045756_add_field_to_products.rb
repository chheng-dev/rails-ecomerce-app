class AddFieldToProducts < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :weight, :string
    add_column :products, :status, :string
    add_column :products, :gender, :string
    add_column :products, :tag, :string
    add_column :products, :tex, :string 
    add_column :products, :discount, :float
    add_column :products, :tag_number, :integer
  end
end
