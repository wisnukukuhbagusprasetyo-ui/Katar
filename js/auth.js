import { auth, db } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Register (role default anggota)
export async function registerUser(email, password) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCred.user.uid;
  await setDoc(doc(db, 'users', uid), {
    email,
    role: "anggota",
    nama: email.split('@')[0],
    createdAt: new Date().toISOString()
  });
  return uid;
}

export async function loginUser(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function logoutUser() {
  await signOut(auth);
}

export function onAuth(callback) {
  onAuthStateChanged(auth, callback);
}