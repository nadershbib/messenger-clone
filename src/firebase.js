import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBtto-jl2hbs7dqRcjFZk2lIaP4evpe6Mg",
    authDomain: "messenger-clone-e550a.firebaseapp.com",
    databaseURL: "https://messenger-clone-e550a.firebaseio.com",
    projectId: "messenger-clone-e550a",
    storageBucket: "messenger-clone-e550a.appspot.com",
    messagingSenderId: "742535810959",
    appId: "1:742535810959:web:754fb919a758c0012d05fa",
    measurementId: "G-3WGM4BVNKD"
  };

const fire = firebase.initializeApp(firebaseConfig);
const db = fire.firestore();
export default db;