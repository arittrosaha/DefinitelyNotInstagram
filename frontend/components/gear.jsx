import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import { logout } from '../actions/session_actions';
import { closeModal } from '../actions/modal_actions';

class Gear extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout().then(this.props.closeModal);
    this.props.history.push('/');
  }

  render () {
    return (
    <ul className='gear-ul'>
      <li className='gear-li-logout'>
        <button className='gear-button' onClick={this.handleLogout}>Log Out</button>
      </li>
      <li className='gear-li-logout'>
        <button className='gear-button' onClick={this.props.closeModal}>Cancel</button>
      </li>
    </ul>
  );}
}

const mapDispatchToProps = (dispatch) => {
  return ({
    logout: () => dispatch(logout()),
    closeModal: () => dispatch(closeModal())
  });
};

export default withRouter(connect(null, mapDispatchToProps)(Gear));
