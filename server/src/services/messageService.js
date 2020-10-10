var createError = require("http-errors");
var firebase = require("firebase-admin");
const { sendMessage } = require("../avaya/functions");
var createError = require("http-errors");

const { createUserAccount } = require("./accountService");

/**
 * Sends a message.
 * 
 * @param {Object} person 

 */
async function createMessageUser(person) {
  try{
    //Create a user account by names and document ID
    const userAccount = person.first_name.replace(/\s/g, '') + 
    person.last_name.replace(/\s/g, '') + person.document_number;

    //Create a random password
    const password = Math.random().toString(36).substr(2, 8);
  
    const accountToSend = await createUserAccount(userAccount, password);
  
    let bodyMessage = `Body false ${accountToSend.email}`;
  
    //Send message
    await sendMessage(`+57${person.phone}`, bodyMessage);

  } catch(err){
    throw createError(400, err);
  }

  

}

module.exports.createMessageUser = createMessageUser;