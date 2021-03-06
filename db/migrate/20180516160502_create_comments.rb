class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.string :body
      t.integer :author_id, null: false
      t.integer :post_id, null: false

      t.timestamps
    end

    add_index :comments, :post_id
  end
end
