
// js/logout.js
import { auth } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

export async function doLogout() {
  try {
    await signOut(auth);
    alert("Berhasil keluar dari akun!");
    location.href = "/auth/login.html";
  } catch (err) {
    alert("Gagal logout: " + err.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnLogout");
  if (btn) btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("Yakin ingin keluar dari akun?")) doLogout();
  });
});
