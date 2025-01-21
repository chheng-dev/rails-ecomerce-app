class CreateOptionValuesProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :option_values_products do |t|
      t.references :product, null: false, foreign_key: true
      t.references :option_value, null: false, foreign_key: true

      t.timestamps
    end
  end
end
