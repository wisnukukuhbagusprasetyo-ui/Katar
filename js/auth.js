// === AUTH.JS FINAL ===
// Untuk Firebase Auth & Firestore integrasi Karang Taruna Cilosari Barat

import { auth, db } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Pastikan sesi login tersimpan agar tidak logout saat reload
setPersistence(auth, browserLocalPersistence)
  .then(() => console.log("🔒 Persistence mode aktif (browserLocalPersistence)"))
  .catch(err => console.error("⚠️ Gagal set persistence:", err));

// === REGISTER USER BARU ===
export async function registerUser(email, password) {
  try {
    console.log("📩 Proses mendaftar user:", email);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Otomatis buat dokumen di Firestore
    const uref = doc(db, "users", user.uid);
    await setDoc(uref, {
      email: user.email,
      name: "",
      foto: "",
      role: "anggota", // default role
      joinedAt: new Date().toLocaleString("id-ID")
    });

    console.log("✅ User baru disimpan di Firestore:", user.email);
    alert("Pendaftaran berhasil! Silakan login untuk melanjutkan.");
    return user;
  } catch (err) {
    console.error("🚫 Gagal daftar:", err);
    alert("Gagal daftar: " + err.message);
  }
}

// === LOGIN USER ===
export async function loginUser(email, password) {
  try {
    console.log("🔐 Login user:", email);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("✅ Login berhasil:", userCredential.user.email);
    return userCredential.user;
  } catch (err) {
    console.error("🚫 Login gagal:", err);
    alert("Login gagal: " + err.message);
  }
}

// === LOGOUT ===
export async function logoutUser() {
  try {
    await signOut(auth);
    console.log("👋 User logout");
  } catch (err) {
    console.error("Gagal logout:", err);
  }
}

// === CEK LOGIN STATE ===
export function onAuth(callback) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("👤 User aktif:", user.email);
    } else {
      console.log("🚫 Tidak ada user login.");
    }
    callback(user);
  });
}