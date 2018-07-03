import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { closeModal } from '../actions/modal_actions';
import { createFollow } from '../actions/follows_actions';
import { deleteFollow } from '../actions/follows_actions';

class LikeIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleLiker = this.handleLiker.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
  }

  handleLiker(likerId) {
    return () => {
      this.props.history.push(`/users/${likerId}`);
      this.props.closeModal();
    };
  }

  followButton () {
    let follow;
    if (this.props.followed === true && this.props.currentUserId !== null && this.props.currentUserId !== this.props.user.id) {
      follow = (
        <button className={`user-follow-button-${this.props.followed}`} onClick={this.handleFollow}>
          Following
        </button>
      );
    } else if (this.props.followed === false && this.props.currentUserId !== null && this.props.currentUserId !== this.props.user.id) {
      follow = (
        <button className={`user-follow-button-${this.props.followed}`} onClick={this.handleFollow}>
          Follow
        </button>
      );
    } else {
      follow = null;
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

  render() {
    return (
      <li className='post-liker'>
        <div className="post-liker-avatar-container" onClick={this.handleLiker(this.props.user.id)}>
          <img className="post-liker-avatar" src={this.props.user.avatar_url} />
        </div>
        <div className="post-liker-details" onClick={this.handleLiker(this.props.user.id)}>
          <div className="post-liker-username">{this.props.user.username}</div>
          <div className="post-liker-fullname">{this.props.user.full_name}</div>
        </div>
        <div className="post-liker-follow">
          {this.followButton()}
        </div>
      </li>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let user;
  if (state.entities.users[ownProps.liker.id] === undefined ) {
    user = {};
  } else {
    user = state.entities.users[ownProps.liker.id];
  }

  let followers = user.follower_ids || [];
  let followed;

  let currentUserId = state.session.id;

  if (followers.includes(currentUserId)) {
    followed = true;
  } else {
    followed = false;
  }

  return ({
    user,
    currentUserId,
    followed
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    createFollow: (userId) => dispatch(createFollow(userId)),
    deleteFollow: (userId) => dispatch(deleteFollow(userId)),
    closeModal: () => dispatch(closeModal())
  });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LikeIndex));
