import { ButtonBase, Icon, TextField, Button, Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react'; 
import { SendIcon } from '@material-ui/icons'
import AccountCircle from '../assets/account-circle.png'; 
import CombinedShapeHeader from '../assets/combined-shape.png'; 

const dialogflow = require('dialogflow');
const uuid = require('uuid');


const Chatbot = () => {
    const [send, setSend] = useState(false); 
    const [text, setText] = useState(); 
    const [textList, setTextList] = useState([]); 
    const [counter, setCounter] = useState(0); 


    /**
     * Crea un comentario. 
     *
     * @param {Boolean} isUser 
     * @param {String} text 
     */

    const getComment = (isUser, text) => {
        // isUser = false; 
        return (  
        <div className = "message-div" >
        {/* texto a mostrar */}
        <div className = "text-div"
        style = {{ 
            order: isUser ? 0 : 2, 
            justifyContent: isUser ? "flex-end": "flex-start"
        }}
            
       > 
            <div  className = "text-container" style = {{ 
            order: isUser ? 0 : 2, 
            background: isUser ? "rgba(170, 225, 223, 1)" : "rgba(216, 216, 216, .24)",
            color: isUser ? "white" : "black"}}>
                {text}
                </div>
        </div>

        {/* Ícono de perfil */}
        <div className = "profile-image"  style = {{ order: !isUser ? 0 : 2 }}>
            <img className="image-profile" src={AccountCircle}/> 
        </div>

            
        </div>); 
    }

    const getComments = () =>{
        return textList.map(( text ) => {
            return (getComment( true, text))
        }) 
    }

    const addText = (text)=> {
        let tempArray = textList; 
        tempArray.push(text); 
        setTextList(tempArray); 
    }

    const sendMessage = (e)=>{
        addText(text); 
        //alert('Enviado'); 
        
        setCounter(3); 
        setText(''); 
    }

    const handleChange = (e) => {
        setText(String(e.target.value)); 
    }
    
    /**
     * Return; 
     */
    
    return (
        <div className="blue-main-container"> 
            <div className="card-text">
           { /* } <img style = {{position: 'absolute', marginTop: 40,  width: '110%', margin: 'auto'}} src = {CombinedShapeHeader} />  */ }
                {/* Header */}
                <div className = "chatbot-header">                 
                    Comunícate con nosotros
                </div> 

                {/* Messages */}
                <div> 
                {/* Lista de comentarios */}
                <div style = {{overflow: 'scroll', maxHeight: '400px'}}>
                    { getComments() }
                </div>
                <form className = "form-text-field">
                    {/* Barra de texto */}
                    <Grid container fullWidth >
                        {/* Textfield */}
                        <Grid item xs={10}>
                            <TextField 
                                id="text-field" 
                                label="Escribe algo"  
                                fullWidth="true"
                                
                                value = {text}
                                onChange={handleChange}/>
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
        </div>
    )
}

export default Chatbot; 