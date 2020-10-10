var createError = require("http-errors");
const { sendMessage } = require("../avaya/functions");
var createError = require("http-errors");

const { createUserAccount } = require("./accountService");

/**
 * Sends a message.
 * 
 * @param {String} uid 
 * @param {String} uniqueCode 
 * @param {String} nameInhouse 
 * @param {String} type 
 * @param {Object} info 
 * @param {Object} dates 
 * @param {String} email1 
 * @param {String} email2 
 * @param {String} emailInhouse 
 * @param {String} clientEmail 
 */
async function createMessageUser(person) {
  try{
    const userAccount = person.first_name + last_name + document_number;
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