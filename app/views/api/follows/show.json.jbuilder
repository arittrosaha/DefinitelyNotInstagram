json.user do
  json.extract! @follow.followee, :id, :username, :full_name, :bio, :email

end

json.follow do
  json.partial! 'api/follows/follow', follow: @follow
end
