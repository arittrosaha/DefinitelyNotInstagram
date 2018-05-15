import React from 'react';
import { connect } from 'react-redux';
import { createPost } from '../actions/posts_actions';

class PostImage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      post: {caption: ""},
      buttonClass: false,
      imageUrl: "",
      imageFile: null
    };
    this.handleImage = this.handleImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(property) {
    return (e) => {
      let post = Object.assign({}, this.state.post);
      let pty = property;
      post[pty] = e.target.value;
      this.setState({post, buttonClass: true});
    };
  }

  handleImage(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () => {
      this.setState({ imageUrl: reader.result, imageFile: file, buttonClass: true });
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageUrl: "", imageFile: null, buttonClass: false});
    }
  }

  handleSubmit(e) {
    e.preventDefault;
    const file = this.state.imageFile;
    const formData = new FormData();
    formData.append("post[caption]", this.state.post.caption);
    if (file) {
      formData.append("post[image]", file);
    }
    this.props.createPost(formData).then(this.props.history.push(`/users/${this.props.currentUserId}`));
  }

  imagePreview() {
    if (this.state.imageUrl !== "") {
      return (
        <div className='post-create-property'>
          <label className='post-create-label'>Image Preview</label>
          <div className='post-preview-container'>
            <img className='post-preview-image' src={this.state.imageUrl}/>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  renderErrors(){
    return (
      <ul className='post-errors'>
        {this.props.errors.map((error, idx) => {
          return (
            <li key={`error-${idx}`}>
              {`${error}!`}
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    let buttonClass;
    if (this.state.buttonClass) {
      buttonClass = 'enabled';
    } else {
      buttonClass = 'disabled';
    }

    return (
      <form className='post-create-form' onSubmit={this.handleSubmit}>
        <div className='post-create-property'>
          <label className='post-create-label'>Caption</label>
          <textarea className='post-create-input' onChange={this.handleChange('caption')} value={this.state.post.caption} />
        </div>

        <div className='post-create-property'>
          <label className='post-create-label'>Image</label>
          <input className='post-create-input' type='file' onChange={this.handleImage} />
        </div>

        <div className='post-create-property'>
          <div className='post-create-label'></div>
          {this.renderErrors()}
        </div>

        {this.imagePreview()}

        <div className='post-create-property'>
          <div className='post-create-label'></div>
          <button disabled={!this.state.buttonClass} className={`post-create-button-${buttonClass}`}>Post the Image</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({session, errors}) => {
  return ({
    currentUserId: session.id,
    errors: errors.post
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    createPost: (formData) => dispatch(createPost(formData))
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(PostImage);
