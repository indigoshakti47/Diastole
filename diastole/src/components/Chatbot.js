import { TextField, Button, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import AccountCircle from '../assets/account-circle.png';

const dialogflow = require('dialogflow');
const uuid = require('uuid');


const Message = ({ isUser, text }) => (
    <div className="message-div" key>
        {/* texto a mostrar */}
        <div className="text-div"
            style={{
                order: isUser ? 0 : 2,
                justifyContent: isUser ? "flex-end" : "flex-start"
            }}

        >
            <div className="text-container" style={{
                order: isUser ? 0 : 2,
                background: isUser ? "rgba(170, 225, 223, 1)" : "rgba(216, 216, 216, .24)",
                color: isUser ? "white" : "black"
            }}>
                {text}
            </div>
        </div>

        {/* Ícono de perfil */}
        <div className="profile-image" style={{ order: !isUser ? 0 : 2 }}>
            <img className="image-profile" src={AccountCircle} />
        </div>
    </div>
)

const Chatbot = ({ sessionId }) => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');

    const generateBody = text => (
        {
            sessionId,
            queryInput: {
                text: {
                    text,
                    languageCode: "es-US"
                }
            }
        }
    );

    const sendMessage = async (e) => {
        const textToSend = text
        const newMessages = [...messages, { isUser: true, text: textToSend }]
        setMessages(newMessages);
        setText('');
        const res = await fetch(process.env.REACT_APP_API_URL + 'sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(generateBody(textToSend))
        });
        const data = await res.json();
        const textResponse = data.response.fulfillmentMessages[0].text.text[0];
        //alert('Enviado'); 
        setMessages([...newMessages, { isUser: false, text: textResponse }])
        console.log(messages);
    }

    const handleChange = (e) => {
        setText(String(e.target.value));
    }

    /**
     * Return; 
     */

    return (
        <div className="blue-main-container">
            <div className="card-text" style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                { /* } <img style = {{position: 'absolute', marginTop: 40,  width: '110%', margin: 'auto'}} src = {CombinedShapeHeader} />  */}
                {/* Header */}
                <div className="chatbot-header">
                    Comunícate con nosotros
                </div>

                    <div style={{ overflow: 'scroll', height: '100%' }}>
                        {messages.map(({isUser, text}, i) => <Message isUser={isUser} text={text} key={i} />)}
                    </div>
                    <form className="form-text-field">
                        {/* Barra de texto */}
                        <Grid container fullWidth >
                            {/* Textfield */}
                            <Grid item xs={10}>
                                <TextField
                                    id="text-field"
                                    label="Escribe algo"
                                    fullWidth="true"
                                    value={text}
                                    onChange={handleChange} />
                            </Grid>
                            {/* Botón de envío */}
                            <Grid item xs={2}>
                                <Button
                                    className="send-btn"
                                    // variant="contained"
                                    onClick={sendMessage}

                                >
                                    Enviar
                            </Button>
                            </Grid>
                        </Grid>
                    </form>
            </div>
        </div>
    )
}

export default Chatbot; 