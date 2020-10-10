import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyC7D1pSj2EUR46QyDPw5dQyIZoIPxdh2tg",
    authDomain: "diastole11.firebaseapp.com",
    databaseURL: "https://diastole11.firebaseio.com",
    projectId: "diastole11",
    storageBucket: "diastole11.appspot.com",
    messagingSenderId: "94049733363",
    appId: "1:94049733363:web:5a5691eea174b4fc3c0586",
    measurementId: "G-QWGFYYEFLP"
  };

const fire = firebase.initializeApp(firebaseConfig);
export default fire;