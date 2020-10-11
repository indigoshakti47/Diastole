import React, { useState } from "react";
import './Login.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';
import { Link } from 'react-router-dom';
import MessagesIcon from '@material-ui/icons/Message'
import Fab from '@material-ui/core/Fab'
import fire from "../fire";
import Login from '../components/Login';

const LoginPage = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const clearInput = () => {
    setEmail('');
    setPassword('');
  };

  const clearError = () => {
    setPasswordError('');
    setEmailError('');
  };

  const handleLogin = async () => {
    clearError()
    try {
      await login({ email, password })
    } catch (err) {
      const emailErrors = ["auth/invalid-email", "auth/user-disabled", "auth/user-not-found"];

      if (emailErrors.includes(err.code)) {
        return setEmailError(err.message);
      }
      return setPasswordError(err.message);
    }
  };

  const handleSignup = () => {
    clearError()
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(console.log)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  return(
    <>
      <Login
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
      handleSignup={handleSignup}
      hasAccount={hasAccount}
      setHasAccount={setHasAccount}
      emailError={emailError}
      passwordError={passwordError}
      />
      <div className="chatbot-fab">
        <Fab color="primary" aria-label="add" component={Link} to="/tracker">
          <MessagesIcon />
        </Fab>
        <div className="animated-text">
          Revisa el estado de tu ayuda!
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    login: authActions.login
  },
  dispatch,
);


export default connect(null, mapDispatchToProps)(LoginPage);
