// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider ,updateProfile} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7slqbrZ0xOyKvx_fAFeHYA-zNo_Msv9Q",
  authDomain: "cropmate-b0b90.firebaseapp.com",
  projectId: "cropmate-b0b90",
  storageBucket: "cropmate-b0b90.firebasestorage.app",
  messagingSenderId: "549118470958",
  appId: "1:549118470958:web:6aadcd510ce5c0fae528bf"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { updateProfile };