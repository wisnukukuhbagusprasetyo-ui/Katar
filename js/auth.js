<!-- /js/auth.js -->
<script type="module">
import { auth, db } from "./firebase.js";
import {
  setPersistence, browserLocalPersistence,
  onAuthStateChanged, signOut,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { doc, setDoc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Persist login
await setPersistence(auth, browserLocalPersistence);

// pastikan user punya dokumen user
async function ensureUserDoc(uid, email){
  const uref = doc(db, "users", uid);
  const snap = await getDoc(uref);
  if(!snap.exists()){
    await setDoc(uref, {
      email, role: "anggota", createdAt: serverTimestamp()
    }, { merge:true });
  }
}

// API auth yang di-expose ke window  (INI yang mencegah error undefined)
window.AuthAPI = {
  async register(email, pass){
    const { user } = await createUserWithEmailAndPassword(auth, email, pass);
    await ensureUserDoc(user.uid, user.email);
    return user;
  },
  async login(email, pass){
    const { user } = await signInWithEmailAndPassword(auth, email, pass);
    await ensureUserDoc(user.uid, user.email);
    return user;
  },
  async reset(email){
    await sendPasswordResetEmail(auth, email);
    return true;
  },
  async logout(){ await signOut(auth); },
  onAuth(cb){ return onAuthStateChanged(auth, cb); },
  get auth(){ return auth; },
  get db(){ return db; }
};
</script>