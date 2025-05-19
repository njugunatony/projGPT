// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdL4FZpcKBM6vUWEvQgYHrABngM57tXh0",
  authDomain: "cryptic-opus-312420.firebaseapp.com",
  projectId: "cryptic-opus-312420",
  storageBucket: "cryptic-opus-312420.appspot.com",
  messagingSenderId: "639188183255",
  appId: "1:639188183255:web:47ddbeb65e0b126b546892",
  measurementId: "G-NNK11QK7QN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const firebaseAnalytics = analytics;