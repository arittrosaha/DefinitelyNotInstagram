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

export const receiveUser = (response) => {
  return ({
    type: RECEIVE_USER,
    response
  });
};

export const updateCurrentUser = (user) => (dispatch) => {
  return UserApiUtil.updateCurrentUser(user).then( response => {
    dispatch(receiveCurrentUser(response));
  }, errors => {
    dispatch(receiveUsersErrors(errors.responseJSON));
  });
};

export const fetchUser = (userId) => (dispatch) => {
  return UserApiUtil.fetchUser(userId).then( response => {
    dispatch(receiveUser(response));
  }, errors => {
    dispatch(receiveUsersErrors(errors.responseJSON));
  });
};

export const updateCurrentUserAvatar = (formData) => (dispatch) => {
  return UserApiUtil.updateCurrentUserAvatar(formData).then( response => {
    dispatch(receiveCurrentUser(response));
  }, errors => {
    dispatch(receiveUsersErrors(errors.responseJSON));
  });
};
