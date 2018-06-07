import React from 'react';
import { connect } from 'react-redux';

import { closeModal } from '../actions/modal_actions';
import Gear from './gear';
import Avatar from './avatar';
import PostShow from './post_show';


function Modal({modalType, id, closeModal}) {
  if (!modalType) {
    return null;
  }
  // const myReDigit = /\d+/;
  // const myArrDigit = myReDigit.exec(modal);
  // const id = myArrDigit[0];
  // const myReNonDigit = /\D+/;
  // const myArrNonDigit = myReNonDigit.exec(modal);
  // const str = myArrNonDigit[0];

  let component;
  switch (modalType) {
    case 'gear':
      component = <Gear />;
      break;
    case 'avatar':
      component = <Avatar />;
      break;
    case 'post':
      component = <PostShow postId={id}/>;
      break;
    default:
      return null;
  }
  
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modalType: state.ui.modal.type,
    id: state.ui.modal.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
