// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "prime-place-ec5ab.firebaseapp.com",
  projectId: "prime-place-ec5ab",
  storageBucket: "prime-place-ec5ab.appspot.com",
  messagingSenderId: "534769991806",
  appId: "1:534769991806:web:5d08e7ce830a45dc2d182f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);