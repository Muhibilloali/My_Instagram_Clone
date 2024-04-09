import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCQ0QxseD7IyD7w7lj9hfRm7GIWnvGsLDo",
    authDomain: "insta-muhibillo.firebaseapp.com",
    databaseURL: "https://insta-muhibillo-default-rtdb.firebaseio.com",
    projectId: "insta-muhibillo",
    storageBucket: "insta-muhibillo.appspot.com",
    messagingSenderId: "488266156756",
    appId: "1:488266156756:web:5d272508f2ec2423458941"
  };

firebase.initializeApp(firebaseConfig);

const fireStore = firebase.firestore();
const fireStorage = firebase.storage();
const fireAuth = firebase.auth();
const { FieldValue } = firebase.firestore;
const Timestamp = firebase.firestore.FieldValue.serverTimestamp();

export { fireStore, fireAuth, fireStorage, FieldValue, Timestamp };

 

