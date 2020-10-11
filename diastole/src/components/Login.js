import React from 'react'
import "./../App.css";
import BG1 from '../assets/bg-2.svg'; 
import BG2 from '../assets/bg-3.svg'; 
const Login = (props) => {
  const { email, setEmail, password, setPassword, handleLogin, handleSignup, handleLogout, hasAccount, setHasAccount, emailError, passwordError } = props;
  return (
    <section className='login'>
      <img className = "bg-asset left" src = {BG1} />
      <img className = "bg-asset right" src = {BG2} />
      <div className='login-container'>
        <h4>Usuario</h4>
        <input type="text" autoFocus autoCapitalize required value={email} onChange={(
          e => setEmail(e.target.value)
        )} />
        <p className='error-alert'>
          {emailError}
        </p>

        <h4>Contraseña</h4>
        <input type="password" autoFocus autoCapitalize required value={password} onChange={(
          e => setPassword(e.target.value)
        )} />
        <p className='error-alert'>
          {passwordError}
        </p>

        <div className='btn-container'>
          {hasAccount ? (
            <>
              <button className="login-btn" onClick={handleLogin}>Ingresa!</button>
              <p className="p-login">No tienes una cuenta?
                        <span onClick={() => setHasAccount(!hasAccount)}> Regístrate! </span></p>
            </>

          ) : (
              <>
                <button className="login-btn" onClick={handleSignup}>Registrate!</button>
                <p className="p-login">Ya tienes cuenta?
                        <span onClick={() => setHasAccount(!hasAccount)}> Ingresa! </span></p>
              </>

            )}
        </div>

      </div>
    </section>
  )
}
export default Login;
