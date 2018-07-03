class Post < ApplicationRecord
  has_attached_file :image
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to :author,
    class_name: 'User'

  has_many :comments, dependent: :destroy

  has_many :commenters,
    through: :comments,
    source: :author

  has_many :likes, as: :likable

  has_many :likers,
    through: :likes,
    source: :liker

end
