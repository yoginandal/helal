// Import necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Firebase Auth

// Firebase configuration object containing your project's keys and identifiers
const firebaseConfig = {
  apiKey: "AIzaSyAHDYNy273vOTKiqpDdeDaoig_UxtEtzQE",
  authDomain: "medical-93c97.firebaseapp.com",
  databaseURL:
    "https://medical-93c97-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "medical-93c97",
  storageBucket: "medical-93c97.appspot.com",
  messagingSenderId: "406445112366",
  appId: "1:406445112366:web:053dbe71946dfa29dfb3bf",
};

// Initialize Firebase app with the configuration object
const app = initializeApp(firebaseConfig);

// Initialize Firestore database and authentication instance
const db = getFirestore(app);
const auth = getAuth(app); // Initialize Firebase Auth

// Export the database and auth instances to use them in other parts of your app
export { db, auth };
