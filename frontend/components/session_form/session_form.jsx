import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props){
    super(props);
    this.state = this.props.user;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoSubmit = this.handleDemoSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault;
    const user = Object.assign({}, this.state);
    this.props.formAction(user).then(() => this.props.history.push('/'));
  }

  handleDemoSubmit(e){
    e.preventDefault;
    this.props.loginDemo(this.props.demoUser).then(() => this.props.history.push('/'));
  }

  handleChange(property) {
    return (e) => {
      this.setState({[property]: e.target.value});
    };
  }

  renderSessionErrors(){
    return (
      <ul className='session-errors'>
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

  signup() {
    if (this.props.formType[0] === "Sign up") {
      return (
        <div className='signup-inputs'>
          <input className="session-input" type='email' onChange={this.handleChange('email')} value={this.state.email} placeholder="Email"/>
          <input className="session-input" type="text" onChange={this.handleChange('full_name')} value={this.state.full_name} placeholder="Full Name"/>
        </div>
      );
    }
  }

  loginDemo(){
    if (this.props.formType[0] === "Sign up") {
      return (
        <div className="demo-user">
          <input className="session-button" type="submit" onClick={this.handleDemoSubmit} value="Log in with DemoUser"/>
          <div className="or" >OR</div>
        </div>
      );
    }
  }

  render(){
    return (
      <div className="session-main">
        <div className="session-image">
          <img src={window.staticImages.phone} />
          <div>
            <img src={window.staticImages.phone_image} />
          </div>
        </div>
        <div className="session-container">
          <div className="session-hf">
            <h1 className="session-header" >Definitely Not Instagram</h1>
            {this.loginDemo()}
            <form onSubmit={this.handleSubmit} className='session-form'>
              {this.signup()}
              <input className="session-input" type='text' onChange={this.handleChange('username')} value={this.state.username} placeholder="Username"/>
              <input className="session-input" type="password" onChange={this.handleChange('password')} value={this.state.password} placeholder="Password"/>
              {this.renderSessionErrors()}
              <input className="session-button" type="submit" value={this.props.formType[0]} />
              <div className="signin-policy1">{this.props.formType[1]}</div>
              <div className="signin-policy2">{this.props.formType[2]}</div>
            </form>
          </div>

          <div className="session-alternative">
            <label>{this.props.alternativeType[1]}</label>
            <Link className="session-alt-link" to="/" onClick={this.props.alternativeForm}>{this.props.alternativeType[0]}</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SessionForm);
