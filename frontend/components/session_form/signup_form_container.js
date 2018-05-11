import React from 'react';
import { connect } from 'react-redux';
import { login, signup, sessionType, receiveSessionErrors } from '../../actions/session_actions';
import SessionForm from './session_form';


const mapStateToProps = (state) => {
  return({
    errors: state.errors.session,
    user: {email: "", full_name: "", username: "", password: ""},
    demoUser: {username: "demoUser", password: "DemoUserAS"},
    formType: ['Sign up', "By signing up, you agree to be", "Master of the Universe!"],
    alternativeType: ['Log in', 'Have an account?']
  });
};

const mapDispatchToProps = (dispatch) => {
  return({
    alternativeForm: () => {
      dispatch(sessionType('LogInFormContainer'));
      dispatch(receiveSessionErrors([]));
    },
    formAction: (user) => dispatch(signup(user)),
    loginDemo: (user) => dispatch(login(user))
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
