// =====================================================
// AUTH.JS - Modul Autentikasi & Role v5.2
// =====================================================
import { auth, db } from './firebase.js';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// REGISTER
export async function registerUser(email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const userRef = doc(db, "users", cred.user.uid);
  await setDoc(userRef, {
    email,
    role: "anggota", // default role
    createdAt: new Date()
  });
  return cred.user;
}

// LOGIN
export async function loginUser(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

// LOGOUT
export async function logoutUser() {
  await signOut(auth);
}

// ROLE
export async function getUserRole(uid) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data().role;
  return "anggota";
}

// LISTENER
export function onAuth(callback) {
  onAuthStateChanged(auth, callback);
}