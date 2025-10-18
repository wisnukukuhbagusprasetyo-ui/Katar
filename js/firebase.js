// =======================================================
//  Firebase + ImgBB Configuration for Karang Taruna v4.3
// =======================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut 
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// --- KONFIGURASI FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyCgJC8OQBG_wQt57tZHfNuVKPb2VVlAalI",
  authDomain: "karang-taruna-aadaf.firebaseapp.com",
  projectId: "karang-taruna-aadaf",
  storageBucket: "karang-taruna-aadaf.appspot.com",
  messagingSenderId: "367208001887",
  appId: "1:367208001887:web:bce5982d99edefb7e746ea"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// --- KONFIGURASI IMGBB ---
const imgbbApiKey = "d0a0d866377c1d4daa8cd9d937303b76";

// Upload ke ImgBB
export async function uploadToImgBB(file) {
  if (!file) throw new Error("File tidak ditemukan.");
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error?.message || "Upload gagal");
    console.log("[ImgBB] Upload sukses:", data.data.url);
    return data.data.url;
  } catch (err) {
    console.error("Upload Error:", err);
    alert("Gagal upload: " + err.message);
    return "";
  }
}

// --- AUTH HELPER ---
export async function login(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function register(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  return await signOut(auth);
}

console.log("[Firebase Connected ✅]");