import { combineReducers } from 'redux';

import session from './session_errors_reducer';
import user from './users_errors_reducer';
import post from './posts/posts_errors_reducer';
import comment from './comments/comments_errors_reducer';

export default combineReducers({
  session,
  user,
  post,
  comment
});
