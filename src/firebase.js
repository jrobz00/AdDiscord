import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // If using Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRDhRG0i1UfpR7PLeOlWnM9MfIPmGz-_s",
  authDomain: "addiscord-f52a8.firebaseapp.com",
  projectId: "addiscord-f52a8",
  storageBucket: "addiscord-f52a8.firebasestorage.app",
  messagingSenderId: "909708920381",
  appId: "1:909708920381:web:226f79a8bbc764fb4f4c54",
  measurementId: "G-ZWYLR11NV0",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Export auth and db (Firestore) services
const auth = getAuth();
const db = getFirestore();

export { auth, db };  // No need to export 'app' here if you're not using it.
