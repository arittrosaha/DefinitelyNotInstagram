import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props){
    super(props);
    this.state = this.props.user;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault;
    const user = Object.assign({}, this.state);
    this.props.formAction(user).then(() => this.props.history.push('/'));
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
              {error}
            </li>
          );
        })}
      </ul>
    );
  }

  signup() {
    if (this.props.formType === "Sign up") {
      return (
        <div className='session-form'>
          <input className="session-input" type='text' onChange={this.handleChange('email')} value={this.state.email} placeholder="Email"/>
          <br/>
          <input className="session-input" type="text" onChange={this.handleChange('full_name')} value={this.state.full_name} placeholder="Full Name"/>
        </div>
      );
    }
  }

  render(){
    return (
      <div>
        <div className="session-container">
          <h1 className="session-header" >Definitely Not Instagram</h1>
          
          <form onSubmit={this.handleSubmit} className='session-form'>
            {this.signup()}
            <input className="session-input" type='text' onChange={this.handleChange('username')} value={this.state.username} placeholder="Username"/>
            <br/>
            <input className="session-input" type="password" onChange={this.handleChange('password')} value={this.state.password} placeholder="Password"/>
            <br/>
            <input className="session-input" type="submit" className='session-submit' value={this.props.formType} />
          </form>

          <Link to="/" onClick={this.props.alternativeForm} className="session-alternative">{this.props.alternativeType}</Link>
        </div>
        <div>
          <img src='assets/phone.png' />
          <div>
            <img src='assets/phone-image.jpg' />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SessionForm);
