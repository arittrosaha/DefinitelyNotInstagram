import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import CommentIndex from './comment_index';
import CommentForm from './comment_form';
import { deletePost } from '../actions/posts_actions';
import { createLike, deleteLike } from '../actions/likes_actions';
import { closeModal } from '../actions/modal_actions';
import { createFollow } from '../actions/follows_actions';
import { deleteFollow } from '../actions/follows_actions';
import LikeIndex from './like_index';


class PostShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: props.liked,
      likesButton: 'inactive',
      height: null
    };
    this.handlePostDelete = this.handlePostDelete.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleLikes = this.handleLikes.bind(this);
  }

  componentDidMount() {
    this.customStyle();
    let height = document.getElementsByClassName("post-show-details")[0].offsetHeight;
    this.setState({height: height});
  }

  componentDidUpdate() {
    this.customStyle();
  }

  customStyle() {
    let height;
    if (this.state.likesButton === 'inactive') {
      height = document.getElementsByClassName("post-show-img")[0].offsetHeight;
      height = height/2;
      if (height < 228) {
        height = 228;
      } else if (height > 378) {
        height = 378;
      }
    } else if (this.state.likesButton === 'active') {
      height = this.state.height;
      let likesHeader = document.getElementsByClassName("likes-header")[0].offsetHeight;
      height = height-likesHeader;
    }
    document.getElementsByClassName('post-show-scroll-container')[0].style.height = `${height}px`;
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
    let count = this.props.likerIds.length;
    let word;
    if (count === 1) {
      word = "like";
    } else {
      word = "likes";
    }
    return word;
  }

  handleLikes(status) {
    return () => {
      if (status === "active") {
        this.setState({
          likesButton: "active"
        });
      } else if (status === "inactive") {
        this.setState({
          likesButton: "inactive"
        });
      }
    };
  }

  sideBar() {
    let bar;
    if (this.state.likesButton === 'inactive'){
      bar = (
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
            <button className='post-show-likes-button' onClick={this.handleLikes('active')}>
              <div className='post-show-like-count'>{this.props.likerIds.length}</div>
              <div className='post-show-like-word'>{this.LikeCountWord()}</div>
            </button>
          </div>

          <div className="post-show-createdat">{this.props.post.created_at}</div>

          <CommentForm postId={this.props.postId}/>
        </div>
      );
    } else if (this.state.likesButton === 'active') {
      bar = (
        <div className="post-show-likes">
          <div className="likes-header">
            Likes
            <button className="likes-inactive-button" onClick={this.handleLikes('inactive')}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <ul className="post-show-scroll-container">
            {this.props.likers.slice().map( liker => {
              return (
                <LikeIndex liker={liker} key={liker.id}/>
              );
            })}
          </ul>
        </div>
      );
    }
    return bar;
  }

  render(){
    return (
      <div className="post-show-container">
        <div className='post-show-img-container'>
          <img className="post-show-img" src={this.props.post.image_url} />
        </div>
        {this.sideBar()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let post = state.entities.posts[ownProps.postId];
  let author = state.entities.users[post.author_id];
  let currentUserId = state.session.id;
  let likerIds = post.liker_ids || [];
  let likers =  likerIds.slice().map ( id => {
                  return state.entities.users[id];
                });
  let liked;

  if (likerIds.includes(currentUserId)) {
    liked = true;
  } else {
    liked = false;
  }

  return({
    post,
    author,
    currentUserId,
    liked,
    likerIds,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostShow));
