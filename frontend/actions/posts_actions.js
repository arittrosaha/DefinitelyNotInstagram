import * as PostsApiUtil from '../util/posts_api_util';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_POST_ERRORS = 'RECEIVE_POST_ERRORS';
export const REMOVE_POST = 'REMOVE_POST';

export const receivePosts = (posts) => {
  return ({
    type: RECEIVE_POSTS,
    posts
  });
};

export const receivePost = (post) => {
  return ({
    type: RECEIVE_POST,
    post
  });
};

export const receivePostErrors = (errors) => {
  return ({
    type: RECEIVE_POST_ERRORS,
    errors
  });
};

export const removePost = (postId) => {
  return ({
    type: REMOVE_POST,
    postId
  });
};

export const fetchPosts = (userId) => dispatch => {
  return PostsApiUtil.fetchPosts(userId).then( posts => {
    dispatch(receivePosts(posts));
  });
};

export const fetchPost = (postId) => dispatch => {
  return PostsApiUtil.fetchPost(postId).then( post => {
    dispatch(receivePost(post));
  }, errors => {
    dispatch(receivePostErrors(errors.responseJSON));
  });
};

export const createPost = (formData) => dispatch => {
  return PostsApiUtil.createPost(formData).then( post => {
    dispatch(receivePost(post));
  }, errors => {
    dispatch(receivePostErrors(errors.responseJSON));
  });
};

export const updatePost = (post) => dispatch => {
  return PostsApiUtil.updatePost(post).then( post => {
    dispatch(receivePost(post));
  }, errors => {
    dispatch(receivePostErrors(errors.responseJSON));
  });
};

export const deletePost = (postId) => dispatch => {
  return PostsApiUtil.deletePost(postId).then( () => {
    dispatch(removePost(postId));
  }, errors => {
    dispatch(receivePostErrors(errors.responseJSON));
  });
};
