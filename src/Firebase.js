import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAW3zYP5eeYCPBPyN0Af6kaklDrVjf5EVU",
    authDomain: "pokedex-c9ea6.firebaseapp.com",
    databaseURL: "https://pokedex-c9ea6.firebaseio.com",
    projectId: "pokedex-c9ea6",
    storageBucket: "pokedex-c9ea6.appspot.com",
    messagingSenderId: "222945473022",
    appId: "1:222945473022:web:b076733acd92f9a51890af",
    measurementId: "G-J31HX0JQEB"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.firestore();

export default database;