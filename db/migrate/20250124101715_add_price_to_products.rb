class AddPriceToProducts < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :amount, :decimal, precision: 10, scale: 2, default: 0.0
    add_column :products, :sale_amount, :decimal, precision: 10, scale: 2, default: 0.0
    add_column :products, :compare_amount, :decimal, precision: 10, scale: 2, default: 0.0
    add_column :products, :currency, :string, default: 'USD'
  end
end
