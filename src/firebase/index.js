// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5OZ0WPHconm0fCVV1DocGHxdZMuipoOc",
  authDomain: "fir-projact-ab70a.firebaseapp.com",
  projectId: "fir-projact-ab70a",
  storageBucket: "fir-projact-ab70a.appspot.com",
  messagingSenderId: "477684164220",
  appId: "1:477684164220:web:631068878004cf96d18bf9",
  measurementId: "G-MGBTXTTDZN"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
//Export storage
const storage = getStorage(firebase);
export { storage, firebase as default };