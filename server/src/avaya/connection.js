var cpaas = require('@avaya/cpaas');
require('dotenv').config();
var smsConnector = new cpaas.SmsConnector({
  accountSid: process.env.ACCOUNT_SID,
  authToken: process.env.AUTH_TOKEN
});
var callsConnector = new cpaas.CallsConnector({
  accountSid: process.env.ACCOUNT_SID,
  authToken: process.env.AUTH_TOKEN
});

module.exports.smsConnector = smsConnector;
module.exports.callsConnector = callsConnector;