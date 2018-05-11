import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import Main from './main';

const App = (props) => {
  let landing;
  if (props.session.id === null) {
    landing = props.form;
  } else {
    landing = Main;
  }

  return (
    <Route path='/' component={landing} />
  );
};

const mapStateToProps = ({session, ui}) => {
  let form;
  if (ui.session === 'SignUpFormContainer') {
    form = SignUpFormContainer;
  } else {
    form = LogInFormContainer;
  }
  return ({
     session,
     form
  });
};

export default withRouter(connect(mapStateToProps)(App));
