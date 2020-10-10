
const express = require('express');
const fileupload = require("express-fileupload");
const admin = require('firebase-admin');
const cors = require('cors');

const { getFirebaseCredentials, errorHandler } = require("./helpers/helperFunctions");

require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert(getFirebaseCredentials()),
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
 
app.use(messagesRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
