
const express = require('express');
const fileupload = require("express-fileupload");
const admin = require('firebase-admin');
const cors = require('cors');
const serviceAccount = require("../diastole11-firebase-adminsdk-jdbmm-85bda9682b.json");

const { getFirebaseCredentials, errorHandler } = require("./helpers/helperFunctions");

require('dotenv').config();
require('express-async-errors');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://diastole11.firebaseio.com'
});

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())
app.use(fileupload());

app.get('/', (req, res) => {
  res.send('Hello World!')

})

/* Declare routes*/
const messagesRoute = require('./routes/messages');
const beneficiaresRoute = require('./routes/beneficiaries');
const chatRoute = require('./routes/chat');
 
app.use(messagesRoute);
app.use(beneficiaresRoute);
app.use(chatRoute);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
