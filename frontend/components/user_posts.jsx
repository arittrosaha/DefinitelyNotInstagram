import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import { fetchPosts } from '../actions/posts_actions';
import { openModal } from '../actions/modal_actions';

class UserPosts extends React.Component {
  constructor(props){
    super(props);
  }

  // componentDidMount(){
  //   this.props.fetchPosts(this.props.userId);
  // }

  handleModal(modal) {
    return () => this.props.openModal(modal) ;
  }

  posts(){
    return (
      <div className='user-posts'>
        {this.props.posts.reverse().map((post) => {
          return (
            <button className='user-posts-button' key={post.id} onClick={this.handleModal({type: "post", id: post.id})}>
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

  return ({
    posts,
    userId: ownProps.match.params.userId
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    // fetchPosts: (userId) => dispatch(fetchPosts(userId)),
    openModal: (modal) => dispatch(openModal(modal))
  });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPosts));
