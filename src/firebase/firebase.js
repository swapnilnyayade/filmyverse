// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbLHjEMmuTsiyUSTWi1KMH2dmkKt4y7m8",
  authDomain: "filmyverse-2ccec.firebaseapp.com",
  projectId: "filmyverse-2ccec",
  storageBucket: "filmyverse-2ccec.appspot.com",
  messagingSenderId: "275377553520",
  appId: "1:275377553520:web:914f5dda44849d14c474b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const moviesRef = collection(db, "movies")
export const reviewsRef = collection(db, "reviews")
export const usersRef = collection(db, "users")

export default app;