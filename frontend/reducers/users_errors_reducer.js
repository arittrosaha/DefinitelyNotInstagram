import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_USERS_ERRORS } from '../actions/users_actions';

const usersErrorsReducer = (initialState = [], action) => {
  Object.freeze(initialState);

  switch(action.type) {
    case RECEIVE_USERS_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return [];
    default:
      return initialState;
  }
};

export default usersErrorsReducer;
