import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const fbase = initializeApp(firebaseConfig);
const db = getFirestore(fbase);

export const getCandidates = async () => {
    const querySnapshot = await getDocs(collection(db, "candidates"));
    let candidates = querySnapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
    });
    
    return candidates;
}