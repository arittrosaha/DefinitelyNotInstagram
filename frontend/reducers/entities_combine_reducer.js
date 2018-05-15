import { combineReducers } from 'redux';

import users from './users_reducer';
import posts from './posts/posts_reducer';

export default combineReducers({
  users,
  posts
});
