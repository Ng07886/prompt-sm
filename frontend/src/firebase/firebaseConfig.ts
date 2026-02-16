// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBPZG14u-hNEJ8e8EuJfUHRCe8vkaTONY",
  authDomain: "social-media-project-d1f82.firebaseapp.com",
  projectId: "social-media-project-d1f82",
  storageBucket: "social-media-project-d1f82.firebasestorage.app",
  messagingSenderId: "898325912930",
  appId: "1:898325912930:web:d828dfaa8be5ca613de03b",
  measurementId: "G-CCWGVCLMSJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, analytics };
