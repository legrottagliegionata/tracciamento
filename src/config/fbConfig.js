import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Replace this with your own config details
var config = {
  apiKey: "AIzaSyD387f1wDIMTel14deeoApJAbQQvfuv8eU",
  authDomain: "test-b7b42.firebaseapp.com",
  databaseURL: "https://test-b7b42.firebaseio.com",
  projectId: "test-b7b42",
  storageBucket: "test-b7b42.appspot.com",
  messagingSenderId: "443693528829"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
