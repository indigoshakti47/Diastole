import React, { useState, useEffect } from "react";

export default function RequestCodeBeneficiarie() {
  const [beneficiarie, setBeneficiarie] = useState(null);
  const resendCode = ()=>{

  }
  const validateCode = event => {
    event.preventDefault();
    console.log(event.target);
  };
  return (
      
    <div>
        <form onSubmit={this.validateCode}>
            <input placeholder="Ingrese el código del SMS" name="code"/> 
            <button type="submit" >Revisar</button>
        </form>
    </div>
  )
}
