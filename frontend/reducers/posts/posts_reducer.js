import merge from 'lodash/merge';

import { RECEIVE_POSTS, RECEIVE_POST, REMOVE_POST } from '../../actions/posts_actions';

const postsReducer = (initialState = {}, action) => {
  Object.freeze(initialState);

  switch(action.type) {
    case RECEIVE_POSTS:
      return action.posts;
    case RECEIVE_POST:
      return merge({}, initialState, {[action.post.id]: action.post});
    case REMOVE_POST:
      let newState = merge({}, initialState);
      delete newState[action.postId];
      return newState;
    default:
      return initialState;
  }
};

export default postsReducer;
