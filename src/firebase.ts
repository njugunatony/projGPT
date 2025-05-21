// Firebase setup for your project

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUTRKmprTrlys6WKr59kgwPy9WHp7Wnbo",
  authDomain: "senji-pos-system.firebaseapp.com",
  projectId: "senji-pos-system",
  storageBucket: "senji-pos-system.appspot.com",
  messagingSenderId: "344552252001",
  appId: "1:344552252001:web:a0fddce1d7b3e3121e4020",
  measurementId: "G-NP3GKWWBDT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);