import merge from 'lodash/merge';

import {SESSION_TYPE} from '../actions/session_actions';

const sessionUiReducer = (initialState = "SignUpFormContainer", action) => {
  Object.freeze(initialState);
  switch (action.type) {
    case SESSION_TYPE:
    // debugger
      return action.form;
    default:
    // debugger;
      return initialState;
  }
};

export default sessionUiReducer;
