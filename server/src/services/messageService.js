var createError = require("http-errors");
var firebase = require("firebase-admin");
const { sendMessage } = require("../avaya/functions");
var createError = require("http-errors");

const { createPersonAccount } = require("./accountService");

/**
 * Sends a message.
 * 
 * @param {Object} person 

 */
async function createMessageUser(person) {
  try{
    
    let bodyMessage = `${person.first_name}, fuiste seleccionado para la ayuda NOMBRE del gobierno, tu suplemento llegará en TIEMPO, recíbelo con el código ${person.confirmationCode}`;
  
    //Send message
    await sendMessage(`+57${person.cellphone_number}`, bodyMessage);

  } catch(err){
    throw createError(400, err);
  }
}

/**
 * Sends a message.
 * 
 * @param {Object} person 

 */
async function createMessageCode(person) {
  try{
    //Create a user account by names and document ID

    let bodyMessage = `¡Hola ${person.first_name}! El código para recibir tu ayuda es ${person.confirmationCode}`;
  
    //Send message
    await sendMessage(`+57${person.cellphone_number}`, bodyMessage);

  } catch(err){
    throw createError(400, err);
  }
}

module.exports.createMessageUser = createMessageUser;
module.exports.createMessageCode = createMessageCode;