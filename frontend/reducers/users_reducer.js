import merge from 'lodash/merge';

import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const usersReducer = (initialState = {}, action) => {
  Object.freeze(initialState);
  
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, initialState, {[action.currentUser.id]: action.currentUser});
    default:
      return initialState;
  }
};

export default usersReducer;