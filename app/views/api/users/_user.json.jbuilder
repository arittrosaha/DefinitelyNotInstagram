json.extract! user, :id, :username, :full_name, :bio, :email
json.avatar_url asset_path(user.avatar.url)
