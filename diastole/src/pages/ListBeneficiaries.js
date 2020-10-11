import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, Box, Grid, Typography } from '@material-ui/core'

export default function ListBeneficiaries () {
  let history = useHistory();
  const [beneficiaries, setBeneficiaries] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/allBeneficierie?limit=10', {
      method: 'GET',
    }).then(snap => snap.json()).then(response => {
      setBeneficiaries(Object.values(response.beneficiaries))
    })
  }, []);
  const goToBeneficiareData = (beneficiarie) => {
    console.log(beneficiarie)
    //mandar sms al beneficiario
    let formData = new FormData();
    formData.append('person', beneficiarie);
    fetch('http://localhost:5000/sendCodeMessage', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({person : beneficiarie})
    }).then(snap => snap.text()).then(response => {
      console.log(response);
    }).catch(err => console.log(err))
    //  history.push("/detalles-beneficiarios/"+beneficiarie.document_number);
  }
  return (
    <Box flexDirection={"column"} paddingX={"0.25rem"} paddingTop={"0.5rem"}>
      <Typography variant={"h4"} style={{ paddingBottom: "0.5rem" }} col>Lista de beneficiarios</Typography>
      <Grid container spacing={1}>
        {beneficiaries.map((beneficiarie, index) => {
          return <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card
              variant={"outlined"}
              onClick={() => goToBeneficiareData(beneficiarie)}
              style={{ padding: "1rem", cursor: "pointer" }}>
              <Grid container direction="row">
                <Grid item container direction="column">
                  <Typography variant={"h5"}>
                    {beneficiarie.first_name + " " + beneficiarie.last_name}
                  </Typography>
                  <div>{beneficiarie.document_number}</div>
                </Grid>
                <Grid item container direction="column" alignItems="flex-end">
                  <span style={{ color: (beneficiarie.delivered ? "green" : "red") }}>
                    {beneficiarie.delivered ? "Entregado" : "Sin entregar"}
                  </span>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        })}
      </Grid>
    </Box>
  )
}
