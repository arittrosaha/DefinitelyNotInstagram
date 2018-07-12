import React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import { openModal } from '../actions/modal_actions';
import { fetchUser } from '../actions/users_actions';

import Modal from './modal';
import UserPosts from './user_posts';

import { createFollow } from '../actions/follows_actions';
import { deleteFollow } from '../actions/follows_actions';


class User extends React.Component {
  constructor(props) {
    super(props);
    this.handleFollow = this.handleFollow.bind(this);
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
        <button className="user-avatar-button" onClick={this.handleModal({type: "avatar"})}>
          <img className="user-avatar" src={this.props.user.avatar_url} />
        </button>
      );
    } else {
      avatar = <img className="user-avatar" src={this.props.user.avatar_url} />;
    }
    return avatar;
  }

  currentUserButton(){
    let button;
    if (this.props.currentUserId === this.props.user.id) {
      button = (
        <Link className="user-edit-profile" to={`/users/edit`}>
          <div>Edit Profile & Post Images</div>
        </Link>
      );
    } else if (this.props.currentUserId !== null) {
      button = this.followButton();
    } else {
      button = null;
    }
    return button;
  }

  followButton () {
    let follow;
    if (this.props.followed === true) {
      follow = (
        <button className={`user-follow-button-${this.props.followed}`} onClick={this.handleFollow}>
          Following
        </button>
      );
    } else if (this.props.followed === false) {
      follow = (
        <button className={`user-follow-button-${this.props.followed}`} onClick={this.handleFollow}>
          Follow
        </button>
      );
    }
    return follow;
  }

  handleFollow () {
    if (this.props.followed === false){
      this.props.createFollow(this.props.user.id);
    } else {
      this.props.deleteFollow(this.props.user.id);
    }
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

              {this.currentUserButton()}

              {this.currentUserGear()}
            </div>

            <ul className="user-second">
              <li className='user-second-li'>
                <div className='user-second-count'>{this.props.postsCount}</div>
                <span className='user-second-str'>posts</span>
              </li>
              <li className='user-second-li'>
                <div className='user-second-count'>{this.props.followersCount}</div>
                <span className='user-second-str'>followers</span>
              </li>
              <li className='user-second-li'>
                <div className='user-second-count'>{this.props.followingsCount}</div>
                <span className='user-second-str'>following</span>
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

  let followers = user.follower_ids || [];
  let followings = user.following_ids || [];
  let followed;

  let currentUserId = state.session.id;

  if (followers.includes(currentUserId)) {
    followed = true;
  } else {
    followed = false;
  }

  const followersCount = followers.length;
  const followingsCount = followings.length;

  const postsInState = Object.values(state.entities.posts);
  const posts = postsInState.filter(post => post.author_id === Number(ownProps.match.params.userId));
  const postsCount = posts.length;

  return ({
    user,
    currentUserId,
    postsCount,
    followersCount,
    followingsCount,
    followed
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    openModal: (modal) => dispatch(openModal(modal)),
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    createFollow: (userId) => dispatch(createFollow(userId)),
    deleteFollow: (userId) => dispatch(deleteFollow(userId)),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
