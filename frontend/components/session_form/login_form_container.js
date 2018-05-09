import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, sessionType } from '../../actions/session_actions';
import SessionForm from './session_form';


const mapStateToProps = (state) => {
  return({
    errors: state.errors.session,
    user: {username: "", password: ""},
    formType: 'Log in',
    alternativeType: 'Sign up'
  });
};

const mapDispatchToProps = (dispatch) => {
  return({
    alternativeForm: () => dispatch(sessionType('SignUpFormContainer')),
    formAction: (user) => dispatch(login(user))
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
