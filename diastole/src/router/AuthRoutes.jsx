import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthComponent = ({
  component: Component,
  path,
  exact,
  logged,
  authorized,
}) => {
  if (logged && authorized) {
    return <Route component={Component} path={path} exact={exact} />;
  }

  return <Redirect to="/" />;
};

const NoAuthComponent = ({
  component: Component,
  path,
  exact,
  authorized,
  logged,
}) => {
  if (logged && authorized) {
    return <Redirect to="/swipe" />;
  }

  return <Route component={Component} path={path} exact={exact} />;
};

function mapStateToProps({ user, token }) {
  return {
    logged: !!token,
    authorized: user && Boolean(user.fullName),
  };
}

/*
  AuthenticatedRoute
  should be used for routes which require authentication
*/
export const AuthenticatedRoute = connect(mapStateToProps)(AuthComponent);

/*
  AuthenticatedRoute
  should be used for routes which not require authentication
*/
export const UnauthenticatedRoute = connect(mapStateToProps)(NoAuthComponent);
