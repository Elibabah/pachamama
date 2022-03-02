// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBW1eDskrL75VKMvqk4GBPqplq37EVkq_E",
    authDomain: "socialnetwork-6ab25.firebaseapp.com",
    projectId: "socialnetwork-6ab25",
    storageBucket: "socialnetwork-6ab25.appspot.com",
    messagingSenderId: "760031575154",
    appId: "1:760031575154:web:df6fed56773e2310e9d6eb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)