import { initializeApp } from "firebase/app";
import { signInWithPopup as _signInWithPopup, signOut as _signOut, getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration.
const firebaseConfig = {
  apiKey: "AIzaSyA65roYPreObg9rkf0B7rbUE3ATyJAfe74",
  authDomain: "apartment-scout.firebaseapp.com",
  projectId: "apartment-scout",
  storageBucket: "apartment-scout.appspot.com",
  messagingSenderId: "785554784224",
  appId: "1:785554784224:web:7b10357c2c56e7ad14b585",
};

// Initialize Firebase.
const app = initializeApp(firebaseConfig);
export default app;

export const auth = getAuth();
// export const storage = firebase.storage()
export const GoogleSignOn = new GoogleAuthProvider();
GoogleSignOn.setCustomParameters({
  prompt: "select_account",
});

const signInWithPopup = () => _signInWithPopup(auth, GoogleSignOn)
const signOut = () => _signOut(auth)
export { signOut, signInWithPopup };
