import merge from 'lodash/merge';

import { RECEIVE_COMMENTS, RECEIVE_COMMENT, REMOVE_COMMENT } from '../../actions/comments_actions';
import { RECEIVE_CURRENT_USER } from '../../actions/session_actions';
import { RECEIVE_USER } from '../../actions/users_actions';

const commentsReducer = (initialState = {}, action) => {
  Object.freeze(initialState);

  let comments;

  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      comments = action.response.comments || {};
      return merge({}, initialState, comments);
      // return merge({}, initialState, action.response.comments);
    case RECEIVE_USER:
      comments = action.response.comments || {};
      return merge({}, initialState, comments);
      // return merge({}, initialState, action.response.comments);
    case RECEIVE_COMMENTS:
      return merge({}, initialState, action.comments);
    case RECEIVE_COMMENT:
      return merge({}, initialState, {[action.comment.id]: action.comment});
    case REMOVE_COMMENT:
      let newState = merge({}, initialState);
      delete newState[action.commentId];
      return newState;
    default:
      return initialState;
  }
};

export default commentsReducer;
