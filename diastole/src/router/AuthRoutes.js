import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

let previousRoute = '/products';

const AuthComponent = ({
  component: Component,
  path,
  exact,
  logged,
  redirect
}) => {
  console.log('isLogged: ', logged)
  if (logged || redirect === false) {
    return <Route component={Component} path={path} exact={exact} />;
  }

  previousRoute = path;

  return <Redirect to="/" />;
};

const NoAuthComponent = ({
  component: Component,
  path,
  exact,
  logged,
}) => {
  if (logged) {
    return <Redirect to={previousRoute} />;
  }

  return <Route component={Component} path={path} exact={exact} />;
};

function mapStateToProps({ user }) {
  return {
    logged: !!user
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
