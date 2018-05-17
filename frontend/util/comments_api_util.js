export const fetchComments = (postId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/posts/${postId}/comments`
  });
};

export const fetchComment = (commentId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/comments/${commentId}`
  });
};

export const createComment = (comment) => {
  return $.ajax({
    method: 'POST',
    url: `/api/posts/${comment.post_id}/comments`,
    data: {comment}
  });
};

export const deleteComment = (commentId) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/comments/${commentId}`
  });
};
