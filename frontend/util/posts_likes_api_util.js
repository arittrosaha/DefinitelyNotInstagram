export const createLike = (postId) => {
  return $.ajax({
    method: 'POST',
    url: `/api/posts/${postId}/likes`
  });
};

export const deleteLike = (postId) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/likes/${postId}`
  });
};
