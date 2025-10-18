import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { 
  getAuth, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, onAuthStateChanged, signOut 
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// --- Konfigurasi Firebase ---
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

// helper
export async function register(email, password){
  return await createUserWithEmailAndPassword(auth, email, password);
}
export async function login(email, password){
  return await signInWithEmailAndPassword(auth, email, password);
}
export async function logout(){
  return await signOut(auth);
}
export { onAuthStateChanged };