import { combineReducers } from 'redux';
import session from './ui_session_reducer';
import modal from './modal_reducer';

export default combineReducers({
  session,
  modal
});
