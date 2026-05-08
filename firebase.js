// 🔥 Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔥 Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyC6BKUl5F_PNGLSBLgH0jaJIMoHu1GhqX0",
  authDomain: "cash-site-bdd7e.firebaseapp.com",
  projectId: "cash-site-bdd7e",
  storageBucket: "cash-site-bdd7e.firebasestorage.app",
  messagingSenderId: "626962598736",
  appId: "1:626962598736:web:1e562fcbe0d463ea1bba55"
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔥 Firestore Database
const db = getFirestore(app);

// ✅ Export
export { db, collection, addDoc };
