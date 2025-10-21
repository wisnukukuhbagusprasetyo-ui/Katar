
import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { UNIT_ID } from "./config.js";

export async function login(email, password){
  return signInWithEmailAndPassword(auth, email, password);
}
export async function registerAnggota({nama, email, password}){
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if(nama){ try{ await updateProfile(cred.user, { displayName: nama }); }catch{} }
  await setDoc(doc(db, "users", cred.user.uid), { uid: cred.user.uid, nama, email, role:"anggota", unit: UNIT_ID, createdAt: Date.now() });
  return cred;
}
export async function resetPassword(email){ return sendPasswordResetEmail(auth, email); }
export async function logout(){ await signOut(auth); location.href="/auth/portal.html"; }
