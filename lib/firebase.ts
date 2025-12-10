import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

// Only initialize Firebase on client side
let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let auth: Auth | undefined;

if (typeof window !== "undefined") {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  // Initialize Firebase only if config is available
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    try {
      if (!getApps().length) {
        app = initializeApp(firebaseConfig);
      } else {
        app = getApps()[0];
      }

      // Initialize Firestore with settings
      db = getFirestore(app);
      
      // Enable offline persistence (optional, helps with connection issues)
      // enableIndexedDbPersistence(db).catch((err) => {
      //   if (err.code == 'failed-precondition') {
      //     console.warn("Multiple tabs open, persistence can only be enabled in one tab at a time.");
      //   } else if (err.code == 'unimplemented') {
      //     console.warn("The current browser does not support all of the features required for persistence.");
      //   }
      // });

      // Initialize Auth
      auth = getAuth(app);
      
      console.log("Firebase initialized successfully");
      console.log("Firebase Project ID:", firebaseConfig.projectId);
    } catch (error) {
      console.error("Firebase initialization error:", error);
    }
  } else {
    console.warn("Firebase config missing. Check your .env.local file.");
    console.warn("Config:", {
      hasApiKey: !!firebaseConfig.apiKey,
      hasProjectId: !!firebaseConfig.projectId,
    });
  }
}

export { db, auth };
export default app;

