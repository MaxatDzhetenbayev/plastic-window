// src/shared/api/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCrVnHyRusZg2PThhvF6a9BkOf1CovNoTY",
    authDomain: "plastic-window.firebaseapp.com",
    projectId: "plastic-window",
    storageBucket: "plastic-window.appspot.com",
    messagingSenderId: "727416466157",
    appId: "1:727416466157:web:7ecdcc2ca565598a5d3ae4",
    measurementId: "G-KZ5P43M86V"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider();
