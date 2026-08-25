// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyArLpQadnbw_psnNCMX_aIQR-wJzbqatWM",
    authDomain: "netflix-12a19.firebaseapp.com",
    projectId: "netflix-12a19",
    storageBucket: "netflix-12a19.firebasestorage.app",
    messagingSenderId: "359974181008",
    appId: "1:359974181008:web:f0d90e63f1ac781e01e015",
    measurementId: "G-99N8PCBESE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
