// === AUTH.JS FINAL ===
import { auth, db } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Simpan sesi login agar tidak hilang saat reload
setPersistence(auth, browserLocalPersistence);

// === REGISTER USER BARU ===
export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // buat dokumen user baru di Firestore
    const uref = doc(db, "users", user.uid);
    const usnap = await getDoc(uref);
    if (!usnap.exists()) {
      await setDoc(uref, {
        email: user.email,
        role: "anggota", // default role
        createdAt: new Date().toISOString()
      });
      console.log("✅ User baru ditambahkan ke Firestore:", user.email);
    }

    return user;
  } catch (err) {
    alert("Gagal daftar: " + err.message);
    console.error(err);
  }
}

// === LOGIN USER ===
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (err) {
    alert("Login gagal: " + err.message);
  }
}

// === LOGOUT ===
export async function logoutUser() {
  await signOut(auth);
  console.log("✅ User logout");
}

// === CEK LOGIN STATE ===
export function onAuth(callback) {
  onAuthStateChanged(auth, callback);
}