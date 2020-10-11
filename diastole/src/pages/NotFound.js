import React from 'react'
import Grid from '@material-ui/core/Grid';
import Dash1 from './../assets/dashboard-1.svg'; 
import Dash2 from './../assets/dashboard-2.svg'; 
import Dash3 from './../assets/dashboard-3.svg'; 
import Dash4 from './../assets/dashboard-4.svg'; 
import Dash5 from './../assets/dashboard-5.svg'; 


export default function NotFound() {
  return (

    
    <>

<Grid container>
  <Grid container item xs={12} md={6}>
  <img className = "dashboard-3" src = {Dash3} /> 
  </Grid>
  <Grid container item xs={4} md={6} spacing={2}>
  <img className = "dashboard-1" src = {Dash1}/> 
  <img className = "dashboard-2" src = {Dash2} /> 
  <img className = "dashboard-5" src = {Dash5}/> 
  </Grid>
</Grid>
   </>
  )
}
