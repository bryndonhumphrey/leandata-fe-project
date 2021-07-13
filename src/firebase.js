import firebase from "firebase/app";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDA3TqZROAYbppxPnmxkr65eCbknp7FdLg",
    authDomain: "leandata-fe-project.firebaseapp.com",
    databaseURL: "https://leandata-fe-project-default-rtdb.firebaseio.com",
    projectId: "leandata-fe-project",
    storageBucket: "leandata-fe-project.appspot.com",
    messagingSenderId: "651999458940",
    appId: "1:651999458940:web:f0d216b09e28422109fbf9",
    measurementId: "G-V0SHKYCZQ2"
  };

  firebase.initializeApp(firebaseConfig);
  const dbUsers = firebase.firestore().collection("users")
  const dbExpense = firebase.firestore().collection("expenses")

export default firebase;