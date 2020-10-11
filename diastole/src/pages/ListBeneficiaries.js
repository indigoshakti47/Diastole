import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function ListBeneficiaries() {
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

      body: formData
    }).then(snap => snap.text()).then(response => {
      console.log(response);
    }).catch(err => console.log(err))
    //  history.push("/detalles-beneficiarios/"+beneficiarie.document_number);
  }
  return (
    <div>
      <h1>benefi list</h1>
      {beneficiaries.map((beneficiarie, index) => {
        return <div onClick={() => goToBeneficiareData(beneficiarie)}>
          <div className="d-flex justify-content-between">
            <strong>{beneficiarie.first_name + " " + beneficiarie.last_name}</strong>
            <span style={{ color: (beneficiarie.delivered ? "green" : "red") }}>{beneficiarie.delivered ? "Entregado" : "Sin entregar"}</span>
          </div>
          <div>{beneficiarie.document_number}</div>
        </div>
      })}
    </div>
  )
}
