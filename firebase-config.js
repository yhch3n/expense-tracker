// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "fake-key",
  authDomain: "fake.firebaseapp.com",
  databaseURL: "https://fake.firebaseio.com",
  projectId: "fake",
  storageBucket: "fake",
  messagingSenderId: "fake",
  appId: "fake",
  measurementId: "fake"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseDB = getDatabase(app);

export { firebaseDB };