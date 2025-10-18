import { auth, db } from './firebase.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

const hello = document.getElementById('adminHello');
const roleEl = document.getElementById('adminRole');
const logoutBtn = document.getElementById('adminLogout');

onAuthStateChanged(auth, async (user)=>{
  if(!user){ window.location.href='./index.html'; return; }
  hello.textContent = user.displayName || user.email;
  const snap = await getDoc(doc(db,'users',user.uid));
  const role = snap.exists()? (snap.data().role || 'anggota') : 'anggota';
  roleEl.textContent = role;
});

logoutBtn?.addEventListener('click', async ()=>{ await signOut(auth); window.location.href='./index.html'; });
