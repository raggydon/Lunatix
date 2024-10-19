// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0C3uivSu0EWLnjru3SEJW8SkgP1cpudA",
  authDomain: "syntax-error-9804b.firebaseapp.com",
  projectId: "syntax-error-9804b",
  storageBucket: "syntax-error-9804b.appspot.com",
  messagingSenderId: "368911886713",
  appId: "1:368911886713:web:5bcad7e5c0d57ef37327a8",
  measurementId: "G-YGX670GCLS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);