import React from 'react';
import { connect } from 'react-redux';

import { closeModal } from '../actions/modal_actions';
import { updateUser } from '../actions/users_actions';

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarUrl: "",
      avatarFile: null
    };
    this.updateAvatar = this.updateAvatar.bind(this);
  }

  updateAvatar(e) {

    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () => {
      this.setState({ avatarUrl: reader.result, avatarFile: file}, this.handleSubmit);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ avatarUrl: "", avatarFile: null });
    }
  }

  handleSubmit() {
    const file = this.state.avatarFile;
    const formData = new FormData();
    formData.append("user[id]", this.props.user.id);
    if (file) {
      formData.append("user[avatar]", file);
    }
    this.props.updateUser(formData).then(this.props.closeModal);
  }

  render () {
    return (
    <ul className='avatar-ul'>
      <li className='avatar-li-update'>
        <button className='avatar-button'>
          <input type='file' onChange={this.updateAvatar}/>
        </button>
      </li>
      <li className='avatar-li-cancel'>
        <button className='avatar-button' onClick={this.props.closeModal}>Cancel</button>
      </li>
    </ul>
  );}
}

const mapStateToProps = (state) => {
  return ({
    user: state.entities.users[state.session.id]
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    updateUser: (user) => dispatch(updateUser(user)),
    closeModal: () => dispatch(closeModal())
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
