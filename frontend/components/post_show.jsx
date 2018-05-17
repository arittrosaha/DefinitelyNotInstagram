import React from 'react';
import { connect } from 'react-redux';


import CommentIndex from './comment_index';
import CommentForm from './comment_form';
import { deletePost } from '../actions/posts_actions';
import { closeModal } from '../actions/modal_actions';

class PostShow extends React.Component {
  constructor(props) {
    super(props);
    this.handlePostDelete = this.handlePostDelete.bind(this);
  }

  handlePostDelete(e){
    this.props.deletePost(this.props.post.id);
    this.props.closeModal();
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

            <button className="post-show-delete" onClick={this.handlePostDelete}>
              <i className="fas fa-times fa-lg"></i>
            </button>
          </div>

          <div className='post-show-scroll-container'>
            <div className="post-show-scroll">
              <div className="post-show-caption">
                <div className="post-show-username">{this.props.author.username}</div>
                {this.props.post.caption}
              </div>

              <CommentIndex postId={this.props.postId}/>
            </div>
          </div>

          <div className="post-show-createdat">{this.props.post.created_at}</div>

          <CommentForm postId={this.props.postId}/>
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
    deletePost: (postId) => dispatch(deletePost(postId)),
    closeModal: () => dispatch(closeModal())
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(PostShow);
