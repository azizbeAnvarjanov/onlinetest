// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

function StartFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyDPLNrIZA-qLg28ghfG-Hp531-wj4VWjLc",
    authDomain: "test-pr-7d46d.firebaseapp.com",
    databaseURL: "https://test-pr-7d46d-default-rtdb.firebaseio.com",
    projectId: "test-pr-7d46d",
    storageBucket: "test-pr-7d46d.appspot.com",
    messagingSenderId: "514313887212",
    appId: "1:514313887212:web:e5eb4be49b6584576074c9",
  };

  const app = initializeApp(firebaseConfig);
  return getDatabase(app);
}

export default StartFirebase;
