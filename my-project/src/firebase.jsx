// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore,serverTimestamp} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUdTqtkYdnHB1wHeYPL6k0iGkQoSw3eOM",
  authDomain: "playverse-78866.firebaseapp.com",
  projectId: "playverse-78866",
  storageBucket: "playverse-78866.firebasestorage.app",
  messagingSenderId: "850595337230",
  appId: "1:850595337230:web:f5f460c4971793d5b0d85f",
  measurementId: "G-DB7MPB63PQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore();
const auth=getAuth();
const provider= new GoogleAuthProvider();
const timestamp=serverTimestamp();

export {app,db,auth,timestamp,provider};