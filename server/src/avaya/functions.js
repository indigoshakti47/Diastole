const cpaas = require('@avaya/cpaas');
var enums = cpaas.enums;
const {smsConnector, callsConnector} = require("./connection")
require('dotenv').config();
async function sendMessage(to, body) {
  console.log(body, to)
  smsConnector
    .sendSmsMessage({
      to: to,
      from: process.env.FROM_PHONE,
      body: body,
      //statusCallback: 'http://mycallback.url.com',
      statusCallbackMethod: enums.HttpMethod.GET,
      allowMultiple: true,
    })
    .then(function (data) {
      console.log(data);
    }).catch(err => console.log(err, 1));
}

async function makeCall(to, xmlInbound) {
  console.log(xmlInbound)
  callsConnector
    .makeCall({
      to: to,
      from: process.env.FROM_PHONE,
      url: xmlInbound,
      method: enums.HttpMethod.GET,
      timeout: 999,
    })
    .then(function (call) {
      console.log(call);
    }).catch(err => console.log(err, 2));
}

module.exports.sendMessage = sendMessage;
module.exports.makeCall = makeCall;
//'http://cloud.zang.io/data/inboundxml/fe7a83d1537ca334b369a269494afd6cba70e33b'
