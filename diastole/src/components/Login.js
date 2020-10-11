import React from 'react'
import { Paper, TextField, Grid, Typography, Box } from '@material-ui/core'
import "./../App.css";
import BG1 from '../assets/bg-2.svg'; 
import BG2 from '../assets/bg-3.svg'; 
const Login = (props) => {
  const { email, setEmail, password, setPassword, handleLogin, handleSignup, handleLogout, hasAccount, setHasAccount, emailError, passwordError } = props;
  return (
<>
      <img className = "bg-asset left" src = {BG1} />
      <img className = "bg-asset right" src = {BG2} />
  
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
    <Grid container justify="center" alignItems="center" style={{ height: "100%" }}>
      <Grid item xs={12} sm={6} md={5} lg={3} xl={3} style={{ padding: "0.5rem" }}>
        <Paper elevation={3} style={{ padding: "2rem 1rem" }}>
          <Box display="flex" justifyContent="center" marginBottom="1.5rem">
            <Typography variant="h4" style={{fontWeight: 500}}>{
              hasAccount ? "Iniciar sesión" : "Registrarse"
            }</Typography>
          </Box>

          <Typography variant="h5">Usuario</Typography>
          <TextField
            
            variant="outlined"
            fullWidth
            autoCapitalize
            required
            value={email}
            autoFocus onChange={(
              e => setEmail(e.target.value))}
          />
          <p className='error-alert' style={{ marginBottom: "0.5rem", color: "red" }}>
            {emailError}
          </p>

          <Typography variant="h5">Contraseña</Typography>
          <TextField
     
            type="password"
            variant="outlined"
            fullWidth
            autoCapitalize
            required
            value={email}
            autoFocus onChange={(
              e => setPassword(e.target.value))}
          />
          <p className='error-alert' style={{ marginBottom: "2rem", color: "red" }}>
            {passwordError}
          </p>

          <Box display="flex" justifyContent="center">
            <div className='btn-container'>
              {hasAccount ? (
                <>
                  <button className="login-btn" onClick={handleLogin}>Ingresa!</button>
                  <p className="p-login">No tienes una cuenta?
                        <span onClick={() => setHasAccount(!hasAccount)} style={{fontWeight: 600, cursor: "pointer"}}> Regístrate! </span></p>
                </>

              ) : (
                  <>
                    <button className="login-btn" onClick={handleSignup}>Registrate!</button>
                    <p className="p-login">Ya tienes cuenta?
                        <span onClick={() => setHasAccount(!hasAccount)} style={{fontWeight: 600, cursor: "pointer"}}> Ingresa! </span></p>
                  </>

                )}
            </div>
          </Box>

        </Paper>
      </Grid>
    </Grid>
 </Box>
    </>
  )
}
export default Login;
