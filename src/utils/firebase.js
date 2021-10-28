// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBgBXQSm4FtQJxArnXpB-NJxGbfAR3nGms",
  authDomain: "side-project-d1344.firebaseapp.com",
  databaseURL: "https://side-project-d1344-default-rtdb.firebaseio.com",
  projectId: "side-project-d1344",
  storageBucket: "side-project-d1344.appspot.com",
  messagingSenderId: "128762249805",
  appId: "1:128762249805:web:8d5153cd86cd898babd204",
  measurementId: "G-CTQMVV7K97",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebase);

// export { firebase, analytics };
export default firebase;
