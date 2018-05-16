import React from 'react';
import { connect } from 'react-redux';

import { fetchPost } from '../actions/posts_actions';

class PostShow extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="post-show-container">
        <div className='post-show-img-container'>
          <img className="post-show-img" src={this.props.post.image_url} />
        </div>

        <div className="post-show-details">
          <div className="post-show-author">
            <div className="post-show-avatar-container">
              <img className="post-show-avatar" src={this.props.author.avatar_url} />
            </div>
            <div className="post-show-username">{this.props.author.username}</div>
          </div>

          <div className="post-show-scroll">
            <div className="post-show-caption">
              <div className="post-show-username">{this.props.author.username}</div>
              {this.props.post.caption}
            </div>

          </div>

          <div className="post-show-createdat">{this.props.post.created_at}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let post = state.entities.posts[ownProps.postId];
  let author = state.entities.users[post.author_id];
  return({
    post,
    author
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchPost: (postId) => dispatch(fetchPost(postId))
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(PostShow);
