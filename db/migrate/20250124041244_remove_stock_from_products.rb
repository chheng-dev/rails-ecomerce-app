class RemoveStockFromProducts < ActiveRecord::Migration[6.1]
  def change
    remove_column :products, :stock, :integer
  end
end
