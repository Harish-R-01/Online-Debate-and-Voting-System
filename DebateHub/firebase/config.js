/**
 * firebase/config.js
 * Central Firebase configuration and service exports.
 * Import this file in every page that needs Firebase.
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, setPersistence, browserLocalPersistence }
  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore }
  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getStorage }
  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

// ── Replace with your own Firebase project values if you fork this project ──
const firebaseConfig = {
  apiKey: "AIzaSyAGm7xBQ3BY-tUa0wKiyx9_xRtU_I-pphg",
  authDomain: "online-voting-system-7ad10.firebaseapp.com",
  projectId: "online-voting-system-7ad10",
  storageBucket: "online-voting-system-7ad10.appspot.com",
  messagingSenderId: "882341360975",
  appId: "1:882341360975:web:0a6f2d5313d64fef2d013a"
};

// Initialize Firebase app (singleton – safe to call multiple times)
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db   = getFirestore(app);
export const storage = getStorage(app);

// Keep the user logged in across browser sessions
setPersistence(auth, browserLocalPersistence).catch(console.error);
