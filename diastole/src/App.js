import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import fire from "./fire";
import PrimarySearchAppBar from "./components/Bar";
import Login from './components/Login';

const App = () => {
  const [user, setUser] = useState("");
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

  const handleLogin = () => {
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/invalid-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleSignup = () => {
    clearError()
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
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

  const handleLogout = () => {
    fire
    .auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) =>{
      if (user){
        setUser(user);
        clearInput()
      } else {
        setUser('');
      }
    })
  };

  useEffect(()=> {
    authListener();
  }, []);

  return(
    <div className="App">
      {user ? (
        <PrimarySearchAppBar handleLogout={handleLogout} />
      ): (
      <Login
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
      handleSignup={handleSignup}
      handleLogout={handleLogout}
      hasAccount={hasAccount}
      setHasAccount={setHasAccount}
      emailError={emailError}
      passwordError={passwordError}
      />
      )}
    </div>
  );
};

export default App;
