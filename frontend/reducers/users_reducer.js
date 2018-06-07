import merge from 'lodash/merge';

import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_USER } from '../actions/users_actions';

import { RECEIVE_FOLLOW } from '../actions/follows_actions';
import { REMOVE_FOLLOW } from '../actions/follows_actions';


const usersReducer = (initialState = {}, action) => {
  Object.freeze(initialState);
  let newState;
  let followers;
  let followings;
  let follower;
  let followee;

  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      newState = merge({}, initialState, {[action.response.user.id]: action.response.user});
      followers = action.response.followers || {};
      Object.values(followers).forEach((user) => {
        newState[user.id] = user;
      });
      followings = action.response.followings || {};
      Object.values(followings).forEach((user) => {
        newState[user.id] = user;
      });
      return newState;
    case RECEIVE_USER:
      newState = merge({}, initialState, {[action.response.user.id]: action.response.user});
      followers = action.response.followers || {};
      Object.values(followers).forEach((user) => {
        newState[user.id] = user;
      });
      followings = action.response.followings || {};
      Object.values(followings).forEach((user) => {
        newState[user.id] = user;
      });
      return newState;
    case RECEIVE_FOLLOW:
      newState = merge({}, initialState, {[action.response.user.id]: action.response.user});
      follower = newState[action.response.follow.follower_id];
      follower.following_ids.push(action.response.follow.followee_id);
      followee = newState[action.response.follow.followee_id];
      followee.follower_ids.push(action.response.follow.follower_id);
      return newState;
    case REMOVE_FOLLOW:
      newState = merge({}, initialState);
      follower = newState[action.response.follow.follower_id];
      const newFollowingIds = follower.following_ids.filter( id => id !== action.response.follow.followee_id)
      follower.following_ids = newFollowingIds;
      followee = newState[action.response.follow.followee_id];
      const newFollowerIds = followee.follower_ids.filter( id => id !== action.response.follow.follower_id)
      followee.follower_ids = newFollowerIds;
      return newState;
    default:
      return initialState;
  }
};

export default usersReducer;
