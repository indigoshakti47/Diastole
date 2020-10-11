const firebase = require("firebase-admin");
const createError = require("http-errors");
const { createMessageUser } = require("./messageService");

/**
 * Create the new beneficiaries
 * 
 */
async function createBeneficiaries() {

  let citizensRef = firebase.firestore().collection('citizens');
  citizensRef = citizensRef.orderBy('sisben', 'asc').limit(25);
  let citizens = {};

  let beneficiarieRef = firebase.firestore().collection('beneficiarie');

  let snapshot = await citizensRef.get()
    .catch((err) => {
      throw createError(500, err);
    });

  snapshot.forEach(doc => {

    citizens[doc.id] = doc.data();
    citizens[doc.id].delivered = false;
    citizens[doc.id].confirmationCode = (Math.random().toString(36).slice(2)).substring(0,4);
    console.log(doc.data())
    //createMessageUser(citizens[doc.id])
  });


  for (const citizen in citizens) {
    await beneficiarieRef.doc(citizen).set(citizens[citizen])
  }
    
}


/**
 * Get the all the beneficieries.
 * 
 * @param {number} limit 
 * 
 * @return {Object} An object containing the users found.
 */
async function getAllBeneficiaries(limit) {

  let beneficiarieRef = firebase.firestore().collection('beneficiarie');
  let beneficiaries = {};

  beneficiarieRef = beneficiarieRef.limit(parseInt(limit));

  let snapshot = await beneficiarieRef.get()
    .catch(() => {
      throw createError(500, 'FIRESTORE_TRANSACTION_ERROR');
    });

  if (snapshot.empty) throw createError(404, 'USER_NOT_FOUND');

  snapshot.forEach(doc => {
    beneficiaries[doc.id] = doc.data();
  });

  if (beneficiaries == null) throw createError(404, 'USER_NOT_FOUND');

  return beneficiaries;
}


/**
* Get the beneficierie.
* 
* @param {number} document_number 
* 
* @return {Object} An object containing the users found.
*/
async function getOneBeneficiarie(document_number) {

  let beneficiarie = firebase.firestore().collection('beneficiarie');
  beneficiarie = beneficiarie.where('document_number', '==', parseInt(document_number));

  let beneficiaries = {};

  let snapshot = await beneficiarie.get()
    .catch(() => {
      throw createError(500, 'FIRESTORE_TRANSACTION_ERROR');
    });

  snapshot.forEach(doc => {
    beneficiaries[doc.id] = doc.data();
  });

  return beneficiaries;

}

/**
* Set the beneficierie.
* 
* @param {number} document_number 
* 
* @return {Object} An object containing the users found.
*/
async function setOneBeneficiarie(document_number, code) {

  const beneficiarieToSet = await getOneBeneficiarie(document_number)
  const codeConfirmation = beneficiarieToSet[Object.keys(beneficiarieToSet)[0]].confirmationCode;

  if(codeConfirmation == code){
    await firebase.firestore().collection('beneficiarie').doc(Object.keys(beneficiarieToSet)[0]).update({delivered: true})
      .catch(() => {
        throw createError(500, err);
      });
  } else {
    throw createError(400, 'CODE_NOT_MATCH');
  }

  return beneficiarieToSet;

}

module.exports.getAllBeneficiaries = getAllBeneficiaries;
module.exports.getOneBeneficiarie = getOneBeneficiarie;
module.exports.createBeneficiaries = createBeneficiaries;
module.exports.setOneBeneficiarie = setOneBeneficiarie;