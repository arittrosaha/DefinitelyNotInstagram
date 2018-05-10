class AddBioToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :bio, :string
    add_column :users, :website, :string
    add_column :users, :gender, :string
  end
end