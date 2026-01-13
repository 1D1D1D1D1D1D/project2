// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAtcOIR2s9E1w9OOXX_vW0K40RZhmS7GyE",
    authDomain: "kanban-6c0fd.firebaseapp.com",
    projectId: "kanban-6c0fd",
    storageBucket: "kanban-6c0fd.firebasestorage.app",
    messagingSenderId: "407142873413",
    appId: "1:407142873413:web:1032426df3ee05d0aa662c"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)