import React, { Component } from 'react'
import "./../App.css";

const Login = (props) => {
    const { email, setEmail, password, setPassword, handleLogin, handleSignup, handleLogout, hasAccount, setHasAccount, emailError, passwordError } = props;
        return (
            <section className='login'>
                <div className='login-container'>
                    <h4>Usuario</h4>
                    <input type="text" autoFocus autoCapitalize required value={email} onChange={(
                        e => setEmail(e.target.value)
                    )}/>
                    <p className='error-alert'>
                    {emailError}
                    </p>

                    <h4>Contraseña</h4>
                    <input type="password" autoFocus autoCapitalize required value={password} onChange={(
                        e => setPassword(e.target.value)
                    )}/>
                    <p className='error-alert'>
                    {passwordError}
                    </p>

                    <div className='btn-container'>
                    {hasAccount ? (
                        <>
                        <button className="login-btn"onClick={handleSignup}>Ingresa!</button>
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
