import * as FollowsApiUtil from '../util/follows_api_util';

export const RECEIVE_FOLLOW = 'RECEIVE_FOLLOW';
export const REMOVE_FOLLOW = 'REMOVE_FOLLOW';

export const receiveFollow = (response) => {
  return ({
    type: RECEIVE_FOLLOW,
    response
  });
};

export const removeFollow = (response) => {
  return ({
    type: REMOVE_FOLLOW,
    response
  });
};


export const createFollow = userId => dispatch => {
  return FollowsApiUtil.createFollow(userId).then( (response) => {
    dispatch(receiveFollow(response));
  });
};

export const deleteFollow = userId => dispatch => {
  return FollowsApiUtil.deleteFollow(userId).then( (response) => {
    dispatch(removeFollow(response));
  });
};
