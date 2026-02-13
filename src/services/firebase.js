// Import the functions from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8fptr1vBWBMZiFAHLX--Djbe3w58HM-0",
  authDomain: "portfolio-c299b.firebaseapp.com",
  projectId: "portfolio-c299b",
  storageBucket: "portfolio-c299b.firebasestorage.app",
  messagingSenderId: "704475930547",
  appId: "1:704475930547:web:9eb2ed04f8a72c2928f5c6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
