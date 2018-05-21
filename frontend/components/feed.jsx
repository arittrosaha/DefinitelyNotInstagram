import React from 'react';
import { connect } from 'react-redux';

import { fetchUser } from '../actions/users_actions';
import FeedPostShow from './feed_post_show';


class Feed extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    if (this.props.posts.length === 0) {
      this.props.fetchUser(this.props.currentUserId);
    }
  }

  Posts(){
    if (this.props.posts.length !== 0) {
      return (
        <div className='feed-container'>
          <div className='feed'>
            {this.props.posts.slice().reverse().map( post => {
              return (
                <FeedPostShow key={post.id} postId={post.id} />
              );
            })}
          </div>

          <div className='feed-side-bar'>
            <div className='feed-currentUser-avatar-container'>
              <img className='feed-currentUser-avatar-img' src={this.props.currentUser.avatar_url} />
            </div>

            <div className='feed-currentUser-details'>
              <div className='feed-currentUser-username'>{this.props.currentUser.username}</div>
              <div className='feed-currentUser-fullname'>{this.props.currentUser.full_name}</div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  render(){
    return (
      this.Posts()
    );
  }
}

const mapStateToProps = (state) => {
  let currentUserId = state.session.id;
  let posts = Object.values(state.entities.posts);
  let currentUser = state.entities.users[currentUserId];

  return({
    currentUserId,
    posts,
    currentUser
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchUser: (userId) => dispatch(fetchUser(userId))
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
