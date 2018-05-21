import React from 'react';
import { connect } from 'react-redux';

import { deleteComment } from '../actions/comments_actions';
import { fetchUser } from '../actions/users_actions';

class CommentIndex extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.comments.forEach( comment => {
      if (this.props.users[comment.author_id] === null) {
        this.props.fetchUser(comment.author_id);
      }
    });
  }

  handleDeleteComment(commentId){
    return () => {
      this.props.deleteComment(commentId);
    };
  }

  deleteComment(comment) {
    let deleteButton = null;
    if (this.props.postAuthorId === this.props.currentUserId) {
      deleteButton = (
        <button className='comment-delete' onClick={this.handleDeleteComment(comment.id)}>
          <i className="fas fa-times"></i>
        </button>
      );
    } else if (comment.author_id === this.props.currentUserId) {
      deleteButton = (
        <button className='comment-delete' onClick={this.handleDeleteComment(comment.id)}>
          <i className="fas fa-times"></i>
        </button>
      );
    }
    return deleteButton;
  }

  comments(){
    return (
      <ul className='comment-ul'>
        {this.props.comments.map((comment) => {
          return (
            <li className='comment-li' key={comment.id}>
              <div className="comment-author">{this.props.users[comment.author_id] ? this.props.users[comment.author_id].username : null}</div>
              <div className='comment-body'>{comment.body}</div>
              {this.deleteComment(comment)}
            </li>
          );
        })}
      </ul>
    );
  }

  render(){
    return (
      this.comments()
    );
  }
}


const mapStateToProps = (state, ownProps) => {

  const commentsInState = Object.values(state.entities.comments);
  const comments = commentsInState.filter(comment => comment.post_id === ownProps.postId);
  const post = state.entities.posts[ownProps.postId];
  const postAuthorId = post.author_id;
  const currentUserId = state.session.id;
  const users = state.entities.users;

  return ({
    comments,
    postAuthorId,
    currentUserId,
    users
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    fetchUser: (userId) => dispatch(fetchUser(userId))
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentIndex);
