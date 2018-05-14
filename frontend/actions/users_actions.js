import * as UserApiUtil from '../util/users_api_util';
import { receiveCurrentUser } from './session_actions';

export const RECEIVE_USERS_ERRORS = 'RECEIVE_USERS_ERRORS';

export const receiveUsersErrors = (errors) => {
  return ({
    type: RECEIVE_USERS_ERRORS,
    errors
  });
};

export const updateUser = (user) => (dispatch) => {
  return UserApiUtil.updateUser(user).then( currentUser => {
    dispatch(receiveCurrentUser(currentUser));
  }, errors => {
    dispatch(receiveUsersErrors(errors.responseJSON));
  });
};
