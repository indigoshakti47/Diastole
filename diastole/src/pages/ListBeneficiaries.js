import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, Box, Grid, Typography, Modal, TextField, Button, Icon , IconButton, Paper, InputBase, Divider } from '@material-ui/core'

import { Search as SearchIcon, Close as CloseIcon } from '@material-ui/icons'

export default function ListBeneficiaries () {

  

  let history = useHistory();
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [open, setOpen] = useState(false); 
  const [document, setDocument] = useState(); 
  const [code, setCode] = useState(); 
  const [beneficiariee, setBeneficiariee] = useState({}); 

  const [option, setOption] = useState(0);  
  const [filteredBeneficiaries, setFiltetedBeneficiaries] = useState([]);
  const [searchInput, setSearchInput] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + 'allBeneficierie?limit=25', {
      method: 'GET',
    }).then(snap => snap.json()).then(response => {
      setBeneficiaries(Object.values(response.beneficiaries))
      setFiltetedBeneficiaries(Object.values(response.beneficiaries))
    })
  }, []);

  const createModal = (beneficiarie) => {
    setDocument(beneficiarie.document_number);
    setBeneficiariee(beneficiarie)
    setOpen(true); 
  }

  const handleClose = () => {
    setOpen(false); 
  }

  const goToBeneficiareData = (beneficiarie) => {
    createModal(beneficiarie); 
    console.log(beneficiarie)

  }

  /**
   * Actualizar el valor de documento del text field.
   * @param {*} e 
   */
  const changeDocument = (e) => {
    setDocument(e.target.value); 
    
  }

  /**
   *  Actualizar el valor de documento del text field.
   * @param {*} e 
   */
  const changeCode = (e) => {
    setCode(e.target.value); 
  }

  /**
   * Envió de información del modal para verificación. 
   */
  const retrieveData = () => {

    fetch(process.env.REACT_APP_API_URL + `beneficierie?document_number=${document}&code=${code}`, {
      method: 'PUT'
      }).then(response => {
      if(response.status == 400) alert("El código enviado no es correcto")
      else {
        alert("El código fue aceptado.")
        const newBeneficiaries = beneficiaries.map(ben => {
          if(ben.document_number == document){
            ben.delivered = true
          }
          return ben
        })
        setBeneficiaries(newBeneficiaries)
      }
      
      console.log(response.status);
    }).catch(err => console.log(err))
    handleClose();
  }

  /**
   * LLamado a la API para recordar el código
   */
  const rememberCode = () => {
    let formData = new FormData();
    formData.append('person', beneficiariee);
    fetch(process.env.REACT_APP_API_URL + 'sendCodeMessage', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({person : beneficiariee})
    }).then(snap => snap.text()).then(response => {
      alert("Código enviado");
    }).catch(err => console.log(err))
  }

  const body = (

    <div className = "modal-dialog">
      <h2 className="heading-2" style = {{ opacity: .8 }}>Beneficiario</h2>
      {/* Formulario del modal*/ }
      <form style = {{ width: '80%', margin: 'auto', marginTop: '40px', position: "relative"}}>
        {/* Documento */ }
      <TextField
      label="Código"
      id="standard-start-adornment"
      fullWidth
      onChange = { changeCode } 
    />
    <div class = "button-group">
            <Button class="button-dialog" variant="contained" color="primary" onClick={retrieveData}>
                Comprobar
            </Button>
            <Button class="button-dialog secondary-button-modal"  variant="contained" color="secondary" onClick={rememberCode}>
               Recordar
            </Button>
    </div>
      </form>
    </div>
  );

  const filterBeneficiaries = (text) => {
    let results = beneficiaries
    if (text) {
      results = beneficiaries.filter(b => `${b.first_name} ${b.last_name}`.includes(text))
    }
    setFiltetedBeneficiaries(results)
  }

  const onInput = (value) => {
    setSearchInput(value)
    filterBeneficiaries(value)
  }

  return (
    <React.Fragment>
      <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
        {body}
    </Modal>
    
    <Box flexDirection={"column"} paddingX={"0.25rem"} paddingTop={"0.5rem"}>
      <Typography variant={"h4"} style={{ paddingBottom: "0.5rem" }} col>Lista de beneficiarios</Typography>
      <Grid container justify="center">
        <Grid item xs={12} sm={6} md={5} lg={3} xl={2}>
          <Paper style={{ marginBottom: "1rem" }}>
            <Box display="flex">
              <IconButton aria-label="menu" flexGrow={0} onClick={() => onInput("")}>
                <CloseIcon />
              </IconButton>
              <InputBase
                value={searchInput}
                onChange={(e) => onInput(e.target.value)}
                style={{ flexGrow: 1 }}
                placeholder="Buscar en la lista de beneficiarios"
              />
              <IconButton type="submit" aria-label="search" onClick={() => filterBeneficiaries(searchInput)}>
                <SearchIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        {filteredBeneficiaries.map((beneficiarie, index) => {
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
    </React.Fragment>
  )
}
