// === js/auth.js ===
import { auth, db } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { doc, setDoc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

window.AuthAPI = {
  // REGISTER
  async register(email, password) {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCred.user;
    const uref = doc(db, "users", user.uid);
    await setDoc(uref, {
      email: user.email,
      role: "anggota",
      createdAt: serverTimestamp()
    });
    console.log("✅ User terdaftar:", user.email);
    return user;
  },

  // LOGIN
  async login(email, password) {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    console.log("✅ Login:", userCred.user.email);
    return userCred.user;
  },

  // RESET PASSWORD
  async reset(email) {
    await sendPasswordResetEmail(auth, email);
    console.log("📧 Link reset dikirim ke", email);
  },

  // LOGOUT
  async logout() {
    await signOut(auth);
    console.log("🚪 Logout sukses");
  },

  // LISTENER
  onAuth(callback) {
    onAuthStateChanged(auth, callback);
  },

  db
};