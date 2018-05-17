import * as CommentsApiUtil from '../util/comments_api_util';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const RECEIVE_COMMENT_ERRORS = 'RECEIVE_COMMENT_ERRORS';

export const receiveComments = comments => {
  return ({
    type: RECEIVE_COMMENTS,
    comments
  });
};

export const receiveComment = comment => {
  return ({
    type: RECEIVE_COMMENT,
    comment
  });
};

export const removeComment = commentId => {
  return ({
    type: REMOVE_COMMENT,
    commentId
  });
};

export const receiveCommentErrors = errors => {
  return ({
    type: RECEIVE_COMMENT_ERRORS,
    errors
  });
};

export const fetchComments = postId => dispatch => {
  return CommentsApiUtil.fetchComments(postId).then( comments => {
    dispatch(receiveComments(comments));
  }, errors => {
    dispatch(receiveCommentErrors(errors.responseJSON));
  });
};

export const fetchComment = commentId => dispatch => {
  return CommentsApiUtil.fetchComment(commentId).then( comment => {
    dispatch(receiveComment(comment));
  }, errors => {
    dispatch(receiveCommentErrors(errors.responseJSON));
  });
};

export const createComment = comment => dispatch => {
  return CommentsApiUtil.createComment(comment).then( comment => {
    dispatch(receiveComment(comment));
  }, errors => {
    dispatch(receiveCommentErrors(errors.responseJSON));
  });
};

export const deleteComment = commentId => dispatch => {
  return CommentsApiUtil.deleteComment(commentId).then( () => {
    dispatch(removeComment(commentId));
  }, errors => {
    dispatch(receiveCommentErrors(errors.responseJSON));
  });
};
