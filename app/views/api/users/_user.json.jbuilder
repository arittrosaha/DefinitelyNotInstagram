json.extract! user, :id, :username, :full_name, :bio, :email
json.avatar_url asset_path(user.avatar.url)

json.follower_ids user.followers.pluck(:id)
json.following_ids user.followings.pluck(:id)
