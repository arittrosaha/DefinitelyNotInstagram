json.extract! post, :id, :caption, :author_id
json.image_url asset_path(post.image.url)
