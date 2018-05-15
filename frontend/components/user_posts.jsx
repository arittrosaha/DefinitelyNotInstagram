import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchPosts } from '../actions/posts_actions';

class UserPosts extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchPosts(this.props.userId);
  }

  posts(){
    return (
      <div className='user-posts'>
        {this.props.posts.reverse().map((post) => {
          return (
            <img key={post.id} className='user-posts-img' src={post.image_url}/>
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

  return ({
    posts,
    userId: ownProps.match.params.userId
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchPosts: (userId) => dispatch(fetchPosts(userId))
  });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPosts));
