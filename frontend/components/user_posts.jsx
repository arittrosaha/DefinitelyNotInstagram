import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { openModal } from '../actions/modal_actions';

class UserPosts extends React.Component {
  constructor(props){
    super(props);
  }

  handleModal(modal) {
    return () => this.props.openModal(modal) ;
  }

  numberOfComments(post){
    return this.props.comments.filter( comment => (comment.post_id === post.id)).length;
  }

  posts(){
    return (
      <div className='user-posts'>
        {this.props.posts.reverse().map((post) => {

          return (
            <button className='user-posts-button' key={post.id} onClick={this.handleModal({type: "post", id: post.id})}>
              <div className='user-posts-hover'>
                <i className="far fa-comment"></i>
                <div className="user-posts-comments-count">{this.numberOfComments(post)}</div>
              </div>
              <img key={post.id} className='user-posts-img' src={post.image_url}/>
            </button>
          );
        })}
      </div>
    );
  }

  render(){
    return (
      this.posts()
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const postsInState = Object.values(state.entities.posts);
  const posts = postsInState.filter(post => post.author_id === Number(ownProps.match.params.userId));
  const comments = Object.values(state.entities.comments);

  return ({
    posts,
    userId: ownProps.match.params.userId,
    comments
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    openModal: (modal) => dispatch(openModal(modal))
  });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPosts));
