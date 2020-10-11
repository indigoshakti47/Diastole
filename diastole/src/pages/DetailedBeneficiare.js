import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function DetailedBeneficiarie() {
    let history = useHistory();
    const [beneficiarie, setBeneficiarie] = useState(null);
    const sendCode = () => {
        fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            body: {}
        }).then(snap => {
            history.push("/verificar-beneficiario/" + beneficiarie.document_number);
        })
    }
    return (
        <div>
            <strong>{beneficiarie.beneficiarie}</strong>
            <span style={{ color: (beneficiarie.deliveried ? "green" : "red") }}>{beneficiarie.deliveried}</span>
            <p>{beneficiarie.document_number}</p>
            <div onClick={this.sendCode}>
                Hacer entrega al beneficiario
            </div>
            <div>
                Reportar beneficiario
            </div>
        </div>
    )
}
