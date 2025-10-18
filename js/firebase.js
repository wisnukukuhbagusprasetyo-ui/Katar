// =======================================================
//  Firebase + ImgBB Configuration for Karang Taruna v4.2
// =======================================================

// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// ========== KONFIGURASI FIREBASE ==========
const firebaseConfig = {
  apiKey: "AIzaSyCgJC8OQBG_wQt57tZHfNuVKPb2VVlAalI",
  authDomain: "karang-taruna-aadaf.firebaseapp.com",
  projectId: "karang-taruna-aadaf",
  storageBucket: "karang-taruna-aadaf.appspot.com",
  messagingSenderId: "367208001887",
  appId: "1:367208001887:web:bce5982d99edefb7e746ea"
};

// Inisialisasi Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

console.log("[Firebase Connected ✅]", firebaseConfig.projectId);

// =======================================================
//                KONFIGURASI IMGBB (Gratis)
// =======================================================

// API Key ImgBB kamu
const imgbbApiKey = "d0a0d866377c1d4daa8cd9d937303b76";

// Fungsi upload gambar ke ImgBB
export async function uploadToImgBB(file) {
  if (!file) throw new Error("File tidak ditemukan untuk diupload.");

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (!allowed.includes(file.type)) {
    alert("Format file tidak didukung. Gunakan JPG, PNG, atau WEBP.");
    return "";
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (!data.success) {
      console.error("ImgBB Error:", data);
      alert("Upload gagal: " + (data.error?.message || "Tidak diketahui"));
      return "";
    }

    const imageUrl = data.data.url;
    console.log("[ImgBB] Upload sukses:", imageUrl);
    return imageUrl;

  } catch (err) {
    console.error("Upload Error:", err);
    alert("Gagal mengunggah gambar: " + err.message);
    return "";
  }
}
