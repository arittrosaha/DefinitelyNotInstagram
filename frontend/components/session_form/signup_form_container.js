import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signup, sessionType } from '../../actions/session_actions';
import SessionForm from './session_form';


const mapStateToProps = (state) => {
  return({
    errors: state.errors.session,
    user: {email: "", full_name: "", username: "", password: ""},
    formType: 'Sign up',
    alternativeType: 'Log in'
  });
};

const mapDispatchToProps = (dispatch) => {
  return({
    alternativeForm: () => dispatch(sessionType('LogInFormContainer')),
    formAction: (user) => dispatch(signup(user))
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
