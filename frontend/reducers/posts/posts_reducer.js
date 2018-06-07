import merge from 'lodash/merge';

import { RECEIVE_POSTS, RECEIVE_POST, REMOVE_POST } from '../../actions/posts_actions';
import { RECEIVE_LIKE, REMOVE_LIKE } from '../../actions/likes_actions';
import { RECEIVE_CURRENT_USER } from '../../actions/session_actions';
import { RECEIVE_USER } from '../../actions/users_actions';

const postsReducer = (initialState = {}, action) => {
  Object.freeze(initialState);
  let newState;
  let likedPost;
  let posts;

  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      posts = action.response.posts || {};
      return merge({}, initialState, posts);
    // return merge({}, initialState, action.response.posts);
    case RECEIVE_USER:
      posts = action.response.posts || {};
      return merge({}, initialState, posts);
      // return merge({}, initialState, action.response.posts);
    case RECEIVE_POSTS:
      return merge({}, initialState, action.posts);
    case RECEIVE_POST:
      return merge({}, initialState, {[action.post.id]: action.post});
    case REMOVE_POST:
      newState = merge({}, initialState);
      delete newState[action.postId];
      return newState;
    case RECEIVE_LIKE:
      newState = merge({}, initialState);
      likedPost = newState[action.like.likable_id];
      likedPost.liker_ids.push(action.like.liker_id);
      return newState;
    case REMOVE_LIKE:
      newState = merge({}, initialState);
      likedPost = newState[action.like.likable_id];
      const newLikerIds = likedPost.liker_ids.filter(id => id !== action.like.liker_id);
      likedPost.liker_ids = newLikerIds;
      return newState;
    default:
      return initialState;
  }
};

export default postsReducer;
