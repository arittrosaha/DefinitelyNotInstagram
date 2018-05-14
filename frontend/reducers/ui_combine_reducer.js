import { combineReducers } from 'redux';
import modal from './modal_reducer';

import session from './ui_session_reducer';

export default combineReducers({
  session,
  modal
});
