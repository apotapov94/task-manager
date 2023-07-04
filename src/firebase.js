import { getAuth } from 'firebase/auth';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs, orderBy, limit, deleteDoc, doc, setDoc } from "firebase/firestore";
//import { getDatabase, ref, set } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPcC4o3vx-cBKggrKwvatolP-_3elPL3g",
  authDomain: "task-manager-d1d30.firebaseapp.com",
  projectId: "task-manager-d1d30",
  storageBucket: "task-manager-d1d30.appspot.com",
  messagingSenderId: "419358787591",
  appId: "1:419358787591:web:32d3de6590e014096482a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth();

export { auth, db, collection, addDoc, query, where, getDocs, orderBy, limit, deleteDoc, doc, setDoc };