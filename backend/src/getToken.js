// getToken.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7slqbrZ0xOyKvx_fAFeHYA-zNo_Msv9Q",
  authDomain: "cropmate-b0b90.firebaseapp.com",
  projectId: "cropmate-b0b90",
  storageBucket: "cropmate-b0b90.firebasestorage.app",
  messagingSenderId: "549118470958",
  appId: "1:549118470958:web:6aadcd510ce5c0fae528bf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const email = "test@example.com";     // Replace with your test user
const password = "123456";            // Replace with your test user's password

signInWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    const user = userCredential.user;
    const token = await user.getIdToken();
    console.log("✅ Firebase ID Token:\n", token);
  })
  .catch((error) => {
    console.error("❌ Error:", error.message);
  });
