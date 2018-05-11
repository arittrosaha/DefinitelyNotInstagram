import React from 'react';
import { connect } from 'react-redux';
import { login, sessionType, receiveSessionErrors } from '../../actions/session_actions';
import SessionForm from './session_form';


const mapStateToProps = (state) => {
  return({
    errors: state.errors.session,
    user: {username: "", password: ""},
    formType: ['Log in'],
    alternativeType: ['Sign up', "Don't have an account?"]
  });
};

const mapDispatchToProps = (dispatch) => {
  return({
    alternativeForm: () => {
      dispatch(sessionType('SignUpFormContainer'));
      dispatch(receiveSessionErrors([]));
    },
    formAction: (user) => dispatch(login(user))
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
