// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqYzIfyLLVh2Ji3R0n55948EAJ9ryU1do",
  authDomain: "crushingdigital-ff16a.firebaseapp.com",
  projectId: "crushingdigital-ff16a",
  storageBucket: "crushingdigital-ff16a.appspot.com",
  messagingSenderId: "561090452575",
  appId: "1:561090452575:web:da3d93dcfa09e4f1288fea",
  measurementId: "G-DK0JD66VBT"
};

// Initialize Firebase
const fbapp = initializeApp(firebaseConfig);
const analytics = getAnalytics(fbapp);

export { fbapp, analytics }