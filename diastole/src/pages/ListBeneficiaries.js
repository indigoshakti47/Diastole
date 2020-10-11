import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function ListBeneficiaries() {
  let history = useHistory();
  const [beneficiaries, setBeneficiaries] = useState([]);
  useEffect(() => {
    fetch('https://localhost:5000/allBeneficierie', {
      method: 'GET',
      headers: {limit:10}
  }).then(snap => {
    console.log(snap);
  })
  },[]);
  const goToBeneficiareData = (beneficiarie)=>{
    //mandar sms al beneficiario
    fetch('https://localhost:5000/', {
      method: 'POST',
      body: {}
  }).then(snap => {
      history.push("/verificar-beneficiario/" + beneficiarie.document_number);
  })
    history.push("/detalles-beneficiarios/"+beneficiarie.document_number);
  }
  return (
    <div>
      <h1>benefi list</h1>
      {beneficiaries.map((beneficiarie, index)=>{
        return <div onClick={()=>goToBeneficiareData(beneficiarie)}>
          <div className="d-flex justify-content-between">
            <strong>{beneficiarie.beneficiarie}</strong>
      <span style={{color: (beneficiarie.deliveried ? "green":"red")}}>{beneficiarie.deliveried}</span>
            </div>
      <div>{beneficiarie.document_number}</div>
        </div>
      })}
    </div>
  )
}
