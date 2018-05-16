import merge from 'lodash/merge';
import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal_actions';

export default function modalReducer(initialState = {type: "", id: null}, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return merge({}, initialState, action.modal);
    case CLOSE_MODAL:
      return {type: "", id: null};
    default:
      return initialState;
  }
}
