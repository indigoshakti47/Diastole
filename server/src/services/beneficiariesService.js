const firebase = require("firebase-admin");
const createError = require("http-errors");
const { createMessageUser } = require("./messageService");

/**
 * Create the new beneficiaries
 * 
 */
async function createBeneficiaries() {

  let citizensRef = firebase.firestore().collection('citizens');
  citizensRef = citizensRef.orderBy('sisben', 'asc').limit(2);
  let citizens = {};

  let beneficiarieRef = firebase.firestore().collection('beneficiarie');

  let snapshot = await citizensRef.get()
    .catch((err) => {
      throw createError(500, err);
    });

  snapshot.forEach(doc => {

    citizens[doc.id] = doc.data();
    citizens[doc.id].delivered = false;
    citizens[doc.id].confirmationCode = Math.random().toString(36).slice(2);
    createMessageUser(doc.data())
  });

  console.log(citizens)

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
* Get the one beneficierie.
* 
* @param {number} document_number 
* 
* @return {Object} An object containing the users found.
*/
async function getOneBeneficiarie(document_number) {

  let beneficiarie = firebase.firestore().collection('beneficiarie');

  beneficiarie = beneficiarie.where('document_number', '==', document_number);

  return await beneficiarie.get();

}

module.exports.getAllBeneficiaries = getAllBeneficiaries;
module.exports.getOneBeneficiarie = getOneBeneficiarie;
module.exports.createBeneficiaries = createBeneficiaries;