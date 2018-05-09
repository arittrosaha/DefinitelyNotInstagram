import merge from 'lodash/merge';

import RECEIVE_SESSION_ERRORS from '../actions/session_actions';
import RECEIVE_CURRENT_USER from '../actions/session_actions';

const sessionErrorsReducer = (initialState = [], action) => {
  Object.freeze(initialState);

  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return [];
    default:
      return initialState;
  }
};

export default sessionErrorsReducer;
