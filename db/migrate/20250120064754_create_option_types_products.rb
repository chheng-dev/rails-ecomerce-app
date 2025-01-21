class CreateOptionTypesProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :option_types_products do |t|
      t.references :option_type, null: false, foreign_key: true
      t.references :product, null: false, foreign_key: true
      t.timestamps
    end
  end
end
