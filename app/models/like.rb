class Like < ApplicationRecord
  validates :liker_id, presence: true

  belongs_to :likable, polymorphic: true

end
