import dotenv from "dotenv";
dotenv.config();

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import admin from "firebase-admin";
import serviceAccount from "./firebaseServiceAccountKey.json" assert { type: 'json' };

// Firebase Configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase (for client-side operations)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Correct Admin Initialization for Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

// Use Firebase Admin Firestore for `.collection()` functionality
const db = admin.firestore();

export { auth, db, admin };
