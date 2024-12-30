class CreateCategories < ActiveRecord::Migration[6.1]
  def change
    create_table :categories do |t|
      t.string :name, null: false
      t.text :description
      t.string :image
      
      t.timestamps
    end
  end

  def down
    drop_table :categories
  end
end
