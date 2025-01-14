class AddFieldsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :username, :string
    add_column :users, :status, :string
    add_column :users, :active, :boolean
    add_column :users, :avatar, :string
  end
end
