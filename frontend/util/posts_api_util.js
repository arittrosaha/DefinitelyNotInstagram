export const fetchPosts = (userId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/posts`
  });
};

export const fetchPost = postId => {
  return $.ajax({
    method: 'GET',
    url: `api/posts/${postId}`
  });
};

export const createPost = formData => {
  return $.ajax({
    url: 'api/posts',
    method: 'POST',
    dataType: 'json',
    processData: false,
    contentType: false,
    data: formData
  });
};

export const updatePost = (post) => {
  return $.ajax({
    url: `api/posts/${post.id}`,
    method: 'PATCH',
    data: {post}
  });
};

export const deletePost = postId => {
  return $.ajax({
    url: `api/posts/${postId}`,
    method: 'DELETE'
  });
};
