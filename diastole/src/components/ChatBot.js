

import React, { useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button';
// import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

const DF_ACCESS_TOKEN = "as"; 



const Chatbot = (test) => {
    const [m_test, m_setTest] = useState(test); 
    const [m_response, m_setResponse] = useState("Hola"); 

    // useEffect(){

    // }

    const sendMessage = () => {
        console.log("Mensaje Enviado");
        m_setResponse("Prueba"); 
    }


    return(
    <React.Fragment>

        <input type = "text"/>
        <div> { m_response } </div> 
        <button onClick = {sendMessage}> Enviar</button>
       
    </React.Fragment> 
    )
    
}


export default Chatbot; 


