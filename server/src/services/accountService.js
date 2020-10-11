const firebase = require("firebase-admin");
const createError = require("http-errors");
const axios = require('axios');

const apiKey = process.env.API_KEY;

/**
 * Sign in the application with an email and password.
 * 
 * @param {string} email 
 * @param {string} password 
 * 
 * @returns {Object} Containing a JWT token provided by Google. 
 */
async function signInWithEmail(email, password) {
  const response = await axios({
    method: 'post',
    url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    data: {
      email: email,
      password: password,
      returnSecureToken: true
    }
  }).catch(err => {
    throw createError(400, err.response.data.error.message);
  });

  return response.data.idToken;

}

/**
 * Create a new person account in the firebase authentication services.
 * 
 * @param {string} email The email you want to register.
 * @param {string} password  The password for the user.
 * 
 * @return {Object} An object With the user uid and the password. 
 */

async function createPersonAccount(account, password) {

  try {
    if (account == null || password == null)
      throw createError(400, 'INVALID_EMAIL_OR_PASSWORD');

    await firebase.auth().getUserByEmail(account).catch(async () => {
      await firebase.auth().createUser({
        email: account,
        emailVerified: true,
        password: password,
        displayName: account
      }).catch(err => {
        throw createError(400, err)
      });
    })      

    return {
      email: account,
      password: password
    };
  } catch (err) {
    throw createError(err);
  }

}

/**
 * Create a person profile in the firestore
 * 
 * @param {string} uid The user uid.
 * @param {string} email The email you want to register.
 */

async function createPersonProfile(uid, email) {

  var userRef = firebase.firestore().collection('users').doc(uid);

  const data = {
    _id: uid,
    email: email,
    createdAt: firebase.firestore.Timestamp.now(),
  };

  await userRef.set(data)
    .catch(() => {
      throw createError(500, "FIRESTORE_TRANSACTION_ERROR");
    });
}

module.exports.signInWithEmail = signInWithEmail;
module.exports.createPersonAccount = createPersonAccount;
module.exports.createPersonProfile = createPersonProfile;