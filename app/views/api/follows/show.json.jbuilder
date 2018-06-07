json.user do
  json.extract! @follow.followee, :id, :username, :full_name, :bio, :email

end

json.follow do
  json.partial! 'api/follows/follow', follow: @follow
end


json.posts do
  @follow.followee.posts.each do |post|
    json.set! post.id do
      json.partial! 'api/posts/post', post: post
    end
  end
end
