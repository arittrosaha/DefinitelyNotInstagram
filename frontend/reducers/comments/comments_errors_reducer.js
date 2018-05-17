import merge from 'lodash/merge';

import { RECEIVE_COMMENT, RECEIVE_COMMENT_ERRORS } from '../../actions/comments_actions';

const commentsErrorsReducer = (initialState = [], action) => {
  Object.freeze(initialState);

  switch(action.type) {
    case RECEIVE_COMMENT_ERRORS:
      return action.errors;
    case RECEIVE_COMMENT:
      return [];
    default:
      return initialState;
  }
};

export default commentsErrorsReducer;
