class CreateOptionValues < ActiveRecord::Migration[6.1]
  def change
    create_table :option_values do |t|
      t.string :name, null: false
      t.string :presentation, null: false
      t.references :option_type, null: false, foreign_key: true

      t.timestamps
    end
  end
end
