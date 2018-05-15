import merge from 'lodash/merge';

import { RECEIVE_POST, RECEIVE_POST_ERRORS } from '../../actions/posts_actions';

const postsErrorsReducer = (initialState = [], action) => {
  Object.freeze(initialState);

  switch(action.type) {
    case RECEIVE_POST_ERRORS:
      return action.errors;
    case RECEIVE_POST:
      return [];
    default:
      return initialState;
  }
};

export default postsErrorsReducer;
