import React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import Modal from './modal';
import { openModal } from '../actions/modal_actions';

class User extends React.Component {
  constructor(props) {
    super(props);
  }

  handleModal(modal) {
    return () => this.props.openModal(modal) ;
  }

  currentUserAvatar() {
    let avatar;
    if (this.props.currentUserId === this.props.user.id) {
      avatar = (
        <button onClick={this.handleModal('avatar')}>
          <img className="user-avatar" src={this.props.user.avatar_url} />
        </button>
      );
    } else {
      avatar = <img className="user-avatar" src={this.props.user.avatar_url} />;
    }
    return avatar;
  }

  currentUserEdit(){
    let edit;
    if (this.props.currentUserId === this.props.user.id) {
      edit = (
        <Link to={`/users/edit`}>
          <div className="user-edit-profile">Edit Profile</div>
        </Link>
      );
    } else {
      edit = null;
    }
    return edit;
  }

  render() {
    return (
      <div className='user'>
        <Modal />

        <div className='user-header'>
          <div className='user-avatar-box1'>
            <div className='user-avatar-box2'>
              {this.currentUserAvatar()}
            </div>
          </div>

          <div className="user-details" >
            <div className='user-first'>
              <h1 className='user-username'>{this.props.user.username}</h1>

              {this.currentUserEdit()}

              <button onClick={this.handleModal('gear')}>
                <i className="fas fa-cog fa-lg"></i>
              </button>
            </div>

            <ul className="user-second">
            </ul>

            <div className="user-third">
              <h1 className="user-full-name">{this.props.user.full_name}</h1>
              <span className="user-bio">{this.props.user.bio}</span>
            </div>
          </div>
        </div>

        <div className='user-post-header'>
          <Link className='post' to={`/users/${this.props.user.id}`}> POSTS
          </Link>
          <div className='saved'> SAVED
          </div>
        </div>

        <div className='user-posts'>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownParams) => {
  return ({
    user: state.entities.users[ownParams.match.params.userId],
    currentUserId: state.session.id
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    openModal: (modal) => dispatch(openModal(modal))
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
