class User < ApplicationRecord
  attr_reader :password

  validates :email, :full_name, :username, :password_digest, :session_token, presence: true
  validates :email, :username, :session_token, uniqueness: true
  validates :password, length: {minimum: 6}, allow_nil: true
  # validates_inclusion_of :gender, in: ["Male", "Female", "Not Specified"], allow_nil: true
  # ,
  has_attached_file :avatar, default_url: 'https://s3.amazonaws.com/definitely-not-instagram-dev/users/default-user.png'
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  after_initialize :ensure_session_token

  has_many :posts,
    foreign_key: :author_id,
    dependent: :destroy

  has_many :comments,
    foreign_key: :author_id

  has_many :likes,
    foreign_key: :liker_id

  has_many :followers_ids,
    class_name: 'Follow',
    foreign_key: :followee_id

  has_many :followers,
    through: :followers_ids,
    source: :follower

  has_many :followees_ids,
    class_name: 'Follow',
    foreign_key: :follower_id

  has_many :followings,
    through: :followees_ids,
    source: :followee

  def self.find_by_credentials (username, password)
    user = User.find_by(username: username)
    return nil unless user
    user.is_password?(password) ? user : nil
    # or
    # return nil unless user && user.valid_password?(password)
    # user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    generate_unique_session_token
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
    # generate_unique_session_token unless self.session_token
  end

  def new_session_token
    SecureRandom.urlsafe_base64
  end

  def generate_unique_session_token
    self.session_token = new_session_token
    while User.find_by(session_token: self.session_token)
      self.session_token = new_session_token
    end
    self.session_token
  end

end
