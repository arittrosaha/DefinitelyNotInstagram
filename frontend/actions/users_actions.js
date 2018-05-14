import * as UserApiUtil from '../util/users_api_util';
import { receiveCurrentUser } from './session_actions';

export const RECEIVE_USERS_ERRORS = 'RECEIVE_USERS_ERRORS';
export const RECEIVE_USER = 'RECEIVE_USER';


export const receiveUsersErrors = (errors) => {
  return ({
    type: RECEIVE_USERS_ERRORS,
    errors
  });
};

export const receiveUser = (user) => {
  return ({
    type: RECEIVE_USER,
    user
  });
};

export const updateUser = (user) => (dispatch) => {
  return UserApiUtil.updateUser(user).then( currentUser => {
    dispatch(receiveCurrentUser(currentUser));
  }, errors => {
    dispatch(receiveUsersErrors(errors.responseJSON));
  });
};

export const fetchUser = (userId) => (dispatch) => {
  return UserApiUtil.fetchUser(userId).then( user => {
    dispatch(receiveUser(user));
  }, errors => {
    dispatch(receiveUsersErrors(errors.responseJSON));
  });
};

export const updateUserAvatar = (user) => (dispatch) => {
  return UserApiUtil.updateUserAvatar(user).then( currentUser => {
    dispatch(receiveCurrentUser(currentUser));
  }, errors => {
    dispatch(receiveUsersErrors(errors.responseJSON));
  });
};
