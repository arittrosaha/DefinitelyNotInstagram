import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router-dom';

const Auth = ({ component: Component, path, exact, loggedIn }) => {
  return (
    <Route path={path} exact={exact} render={ (props) => {
      return (
        !loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to='/' />
        )
      );
    }} />
  );
};

const Protected = ({ component: Component, path, exact, loggedIn }) => {
  return (
    <Route path={path} exact={exact} render={ (props) => {
      return (
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
      );
    }} />
  );
};

const mapStateToProps = (state) => {
  return ({
    loggedIn: Boolean(state.session.id)
  });
};

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
