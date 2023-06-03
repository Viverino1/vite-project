// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC93C9sYJFtGGjA0X79bIpb3vhg_gleZKg",
  authDomain: "debatetoolv1.firebaseapp.com",
  projectId: "debatetoolv1",
  storageBucket: "debatetoolv1.appspot.com",
  messagingSenderId: "148505189347",
  appId: "1:148505189347:web:9c9519b8488ef96cd51ed6",
  measurementId: "G-EGVRCJKLY9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;