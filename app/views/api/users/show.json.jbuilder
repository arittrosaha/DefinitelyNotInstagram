json.user do
  json.partial! 'api/users/user', user: @user
end

json.posts do
  @user.posts.each do |post|
    json.set! post.id do
      json.partial! 'api/posts/post', post: post
    end
  end
  @user.followings.each do |user|
    user.posts.each do |post|
      json.set! post.id do
        json.partial! 'api/posts/post', post: post
      end
    end
  end
end

json.comments do
  @user.posts.each do |post|
    post.comments.each do |comment|
      json.set! comment.id do
        json.partial! 'api/comments/comment', comment: comment
      end
    end
  end
end


json.followers do
  @user.followers.each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
  end
end

# if @user.followers.length == 0
#   json.followers({})
# end

json.followings do
  @user.followings.each do |user|
    json.set! user.id do
      json.partial! 'api/users/user', user: user
    end
  end
end

# if @user.followings.length == 0
#   json.followers({})
# end
