import React from 'react';
import { connect } from 'react-redux';


import CommentIndex from './comment_index';
import CommentForm from './comment_form';
import { deletePost } from '../actions/posts_actions';
import { createLike, deleteLike } from '../actions/likes_actions';
import { closeModal } from '../actions/modal_actions';

class PostShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: props.liked
    };
    this.handlePostDelete = this.handlePostDelete.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }

  handlePostDelete(e){
    this.props.deletePost(this.props.post.id);
    this.props.closeModal();
  }

  PostDeleteButton(){
    let deleteButton;
    if (this.props.author.id === this.props.currentUserId) {
      deleteButton = (
        <button className="post-show-delete" onClick={this.handlePostDelete}>
          Delete Post
        </button>
      );
    } else {
      deleteButton = null;
    }
    return deleteButton;
  }

  handleLike(e){
    if (this.state.liked === false){
      this.props.createLike(this.props.postId).then(() => {
        this.setState({liked: true});
      });
    } else {
      this.props.deleteLike(this.props.postId).then(() => {
        this.setState({liked: false});
      });
    }
  }

  LikeButton(){
    let like;
    if (this.props.currentUserId !== null){
      like = (
        <button className={`post-show-like-button-${this.state.liked}`} onClick={this.handleLike}>
          <i className="fas fa-heart fa-lg"></i>
        </button>
      );
    } else {
      like = null;
    }
    return like;
  }

  LikeCountWord(){
    let count = this.props.likers.length;
    let word;
    if (count === 1) {
      word = "like";
    } else {
      word = "likes";
    }
    return word;
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

            {this.PostDeleteButton()}
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

          <div className='post-show-like'>
            {this.LikeButton()}
          </div>

          <div className='post-show-like-count-container'>
            <div className='post-show-like-count'>{this.props.likers.length}</div>
            <div className='post-show-like-word'>{this.LikeCountWord()}</div>
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
  let currentUserId = state.session.id;
  let likers = post.liker_ids || [];
  let liked;

  if (likers.includes(currentUserId)) {
    liked = true;
  } else {
    liked = false;
  }

  return({
    post,
    author,
    currentUserId,
    liked,
    likers
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    deletePost: (postId) => dispatch(deletePost(postId)),
    createLike: (postId) => dispatch(createLike(postId)),
    deleteLike: (likeId) => dispatch(deleteLike(likeId)),
    closeModal: () => dispatch(closeModal())
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(PostShow);
