class CreateCategoryColors < ActiveRecord::Migration[6.1]
  def change
    create_table :category_colors do |t|
      t.references :category, null: false, foreign_key: true
      t.string :name, null: false
      t.string :code, null: false

      t.timestamps
    end
  end
  
  def down
    drop_table :category_colors
  end
end
