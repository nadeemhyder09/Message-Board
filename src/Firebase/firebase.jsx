  import * as firebase from 'firebase';
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAlbzqhoPbIkXTD5xEt2eCcNASv7J5-z3s",
    authDomain: "message-board-8894f.firebaseapp.com",
    databaseURL: "https://message-board-8894f.firebaseio.com",
    projectId: "message-board-8894f",
    storageBucket: "message-board-8894f.appspot.com",
    messagingSenderId: "287918555567"
  };
  firebase.initializeApp(config);
  export const database = firebase.database().ref('posts');
  export const auth = firebase.auth();
  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  export const facebookProvider = new firebase.auth.FacebookAuthProvider();
