import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const SESSION_TYPE = 'SESSION_TYPE';

export const receiveCurrentUser = (currentUser) => {
  return ({
    type: RECEIVE_CURRENT_USER,
    currentUser
  });
};

export const logoutCurrentUser = () => {
  return ({
    type: LOGOUT_CURRENT_USER
  });
};

export const receiveSessionErrors = (errors) => {
  return ({
    type: RECEIVE_SESSION_ERRORS,
    errors
  });
};

export const sessionType = (form) => {
  return ({
    type: SESSION_TYPE,
    form
  });
};

export const signup = (user) => {
  return (dispatch) => {
    return SessionApiUtil.signup(user).then(
      ((currentUser) => {
        dispatch(receiveCurrentUser(currentUser));
      }), ((errors) => {
        dispatch(receiveSessionErrors(errors));
      })
    );
  };
};

export const login = (user) => (dispatch) => {
  return SessionApiUtil.login(user).then( currentUser => {
    dispatch(receiveCurrentUser(currentUser));
  }, errors => {
    dispatch(receiveSessionErrors(errors));
  });
};

export const logout = () => dispatch => {
  return SessionApiUtil.logout().then( () => {
    dispatch(logoutCurrentUser());
  });
};
