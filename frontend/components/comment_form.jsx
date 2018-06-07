import React from 'react';
import { connect } from 'react-redux';

import { createComment } from '../actions/comments_actions';

class CommentForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      body: '',
      post_id: props.postId
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.createComment(this.state);
    this.setState({body: ''});
  }

  handleChange(e){
    this.setState({body: e.target.value});
  }

  handleKey(e){
    if (e.keyCode === 13 && e.shiftKey === false && this.state.body !== '') {
      this.handleSubmit(e);
    }

    if (e.keyCode === 13) e.preventDefault();
  }

  render(){
    return(
      <form className='comment-form'>
        <textarea onKeyDown={this.handleKey} className='comment-textarea' onChange={this.handleChange} value={this.state.body} placeholder="Add a comment..."/>
      </form>
    );
  }
}

const mapStateToProps = ({errors}) => {
  return ({
    errors: errors.comment
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    createComment: (comment) => dispatch(createComment(comment))
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
