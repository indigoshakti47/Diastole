import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';

import { AuthenticatedRoute, UnauthenticatedRoute } from './AuthRoutes';
import NotFound from '../pages/NotFound';
import ROUTES from './routes';
import fire from '../fire';

const routes = ROUTES.map((route) => {
  if (route.path instanceof Array) {
    return route.path.map((path) => ({
      ...route,
      path,
    }));
  }
  return route;
}).flat();

const Router = ({ setUser }) => {
  useEffect(()=> {
    fire.auth().onAuthStateChanged((user) =>{
      if (user){
        setUser(user);
      }
    });
  }, []);

  return (
    <Switch>
      {routes.map(({
        auth, exact, key, path, redirect, component,
      }) => {
        const AuthRoute = auth ? AuthenticatedRoute : UnauthenticatedRoute;
        return (
          <AuthRoute
            key={key}
            exact={exact}
            component={component}
            path={path}
            redirect={redirect}
          />
        );
      })}
      <Route component={NotFound} />
    </Switch>
  );
};


const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setUser: authActions.setUser
  },
  dispatch,
);

export default connect(null, mapDispatchToProps)(Router);
