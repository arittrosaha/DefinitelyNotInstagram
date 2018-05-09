import { combineReducers } from 'redux';

import entities from './entities_combine_reducer';
import session from './session_reducer';
import errors from './errors_combine_reducer';
import ui from './ui_combine_reducer';

export default combineReducers({
  entities,
  session,
  ui,
  errors
});
