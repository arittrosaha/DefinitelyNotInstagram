class Comment < ApplicationRecord
  validates :body, :author_id, :post_id, presence: true

  belongs_to :author,
    class_name: "User"

  belongs_to :post

  has_many :likes, as: :likable

end
