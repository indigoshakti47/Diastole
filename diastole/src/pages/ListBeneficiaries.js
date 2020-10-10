import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function ListBeneficiaries() {
  const [beneficiaries, setBeneficiaries] = useState(null);
  const goToBeneficiareData = (beneficiarie)=>{
    //mandar sms al beneficiario
    let history = useHistory();
    history.push("/detalles-beneficiarios/"+beneficiarie.document_number);
  }
  return (
    <div>
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
