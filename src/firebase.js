import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDPT4RYnckR6eG3ME8aB2rV2xruJNDCMMw",
    authDomain: "nosleep-fa0b7.firebaseapp.com",
    databaseURL: "https://nosleep-fa0b7.firebaseio.com",
    projectId: "nosleep-fa0b7",
    storageBucket: "",
    messagingSenderId: "216903732300"
  };
  firebase.initializeApp(config);

  export default firebase;