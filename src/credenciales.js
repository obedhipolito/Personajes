// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWskysOCbDhTqNm2JyEJFMkl7OClc-KRw",
  authDomain: "personajes2.firebaseapp.com",
  projectId: "personajes2",
  storageBucket: "personajes2.appspot.com",
  messagingSenderId: "1042949077562",
  appId: "1:1042949077562:web:e542adde7cc6064baa9303"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;