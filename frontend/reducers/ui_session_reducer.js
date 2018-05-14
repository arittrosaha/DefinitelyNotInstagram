import merge from 'lodash/merge';

import {SESSION_TYPE} from '../actions/session_actions';

const sessionUiReducer = (initialState = "SignUpFormContainer", action) => {
  Object.freeze(initialState);
  switch (action.type) {
    case SESSION_TYPE:
      return action.form;
    default:
      return initialState;
  }
};

export default sessionUiReducer;
