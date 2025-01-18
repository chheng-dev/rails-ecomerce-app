class CreateOptionTypes < ActiveRecord::Migration[6.1]
  def change
    create_table :option_types do |t|
      t.string :name, null: false
      t.string :presentation, null: false
      t.boolean :filterable, default: false

      t.timestamps
    end
  end
end
