import React from 'react';
import { connect } from 'react-redux';

import { updateUser } from '../actions/users_actions';


class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      buttonClass: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault;
    this.props.updateUser(this.state.user);
  }

  handleChange(property) {
    return (e) => {
      let user = Object.assign({}, this.state.user);
      let pty = property;
      user[pty] = e.target.value;
      this.setState({user, buttonClass: true});
    };
  }

  render () {

    let buttonClass;
    if (this.state.buttonClass) {
      buttonClass = 'enabled';
    } else {
      buttonClass = 'disabled';
    }

    return (
      <form className='profile-edit-form'onSubmit={this.handleSubmit}>
        <div className='profile-edit-property'>
          <label className='profile-edit-label'>Name</label>
          <input className='profile-edit-input' type='text' onChange={this.handleChange('full_name')} value={this.state.user.full_name} />
        </div>

        <div className='profile-edit-property'>
          <label className='profile-edit-label'>Username</label>
          <input className='profile-edit-input' type='text' onChange={this.handleChange('username')} value={this.state.user.username} />
        </div>

        <div className='profile-edit-property'>
          <label className='profile-edit-label'>Bio</label>
          <textarea className='profile-edit-textarea' onChange={this.handleChange('bio')} value={this.state.user.bio} />
        </div>

        <div className='profile-edit-property'>
          <div className='profile-edit-label'></div>
          <div className="profile-edit-private">Private Information</div>
        </div>

        <div className='profile-edit-property'>
          <label className='profile-edit-label'>Email</label>
          <input className='profile-edit-input' type='email' onChange={this.handleChange('email')} value={this.state.user.email} />
        </div>

        <div className='profile-edit-property'>
          <div className='profile-edit-label'></div>
          <button disabled={!this.state.buttonClass} className={`profile-edit-button-${buttonClass}`}>Submit</button>
        </div>
      </form>
    );
  }

}

const mapStateToProps = (state) => {
  return ({
    user: state.entities.users[state.session.id]
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    updateUser: (user) => dispatch(updateUser(user))
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
