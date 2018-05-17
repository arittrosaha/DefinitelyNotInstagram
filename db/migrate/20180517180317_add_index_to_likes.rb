class AddIndexToLikes < ActiveRecord::Migration[5.1]
  def change
    add_index :likes, [:liker_id, :likable_id, :likable_type], unique: true
  end
end
