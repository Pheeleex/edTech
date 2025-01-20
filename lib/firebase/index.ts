// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAntmMSFbfvOBEOwrpegKiE37RumeS-iWg",
  authDomain: "edutech-b18a1.firebaseapp.com",
  projectId: "edutech-b18a1",
  storageBucket: "edutech-b18a1.firebasestorage.app",
  messagingSenderId: "405595481643",
  appId: "1:405595481643:web:3e3be91cc05c2e235aac6e",
  measurementId: "G-7RQGKDVEV0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)

