import React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import { openModal } from '../actions/modal_actions';
import { fetchUser } from '../actions/users_actions';

import Modal from './modal';
import UserPosts from './user_posts';


class User extends React.Component {
  constructor(props) {
    super(props);
  }

  handleModal(modal) {
    return () => this.props.openModal(modal);
  }

  componentDidMount(){
    if (this.props.currentUserId !== this.props.match.params.userId) {
      this.props.fetchUser(this.props.match.params.userId);
    }
  }

  componentWillReceiveProps(nextProps){
    if (this.props.match.params.userId !== nextProps.match.params.userId) {
      this.props.fetchUser(nextProps.match.params.userId);
    }
  }

  currentUserAvatar() {
    let avatar;
    if (this.props.currentUserId === this.props.user.id) {
      avatar = (
        <button onClick={this.handleModal({type: "avatar"})}>
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
        <Link className="user-edit-profile" to={`/users/edit`}>
          <div>Edit Profile & Post Images</div>
        </Link>
      );
    } else {
      edit = null;
    }
    return edit;
  }

  currentUserGear(){
    let gear;
    if (this.props.currentUserId === this.props.user.id) {
      gear = (
        <button onClick={this.handleModal({type: "gear"})}>
          <i className="fas fa-cog fa-lg"></i>
        </button>
      );
    } else {
      gear = null;
    }
    return gear;
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

              {this.currentUserGear()}
            </div>

            <ul className="user-second">
              <li className='user-second-li'>
                <div className='user-post-count'>{this.props.postsCount}</div>
                <span className='user-post-str'>posts</span>
              </li>
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

        <UserPosts />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let user;
  if (state.entities.users[ownProps.match.params.userId] === undefined ) {
    user = {};
  } else {
    user = state.entities.users[ownProps.match.params.userId];
  }

  const postsInState = Object.values(state.entities.posts);
  const posts = postsInState.filter(post => post.author_id === Number(ownProps.match.params.userId));
  const postsCount = posts.length;

  return ({
    user: user,
    currentUserId: state.session.id,
    postsCount
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    openModal: (modal) => dispatch(openModal(modal)),
    fetchUser: (userId) => dispatch(fetchUser(userId))
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
