import merge from 'lodash/merge';

import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_USER } from '../actions/users_actions';


const usersReducer = (initialState = {}, action) => {
  Object.freeze(initialState);

  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, initialState, {[action.currentUser.id]: action.currentUser});
    case RECEIVE_USER:
      return merge({}, initialState, {[action.user.id]: action.user});
    default:
      return initialState;
  }
};

export default usersReducer;
