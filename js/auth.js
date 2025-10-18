import { auth, db } from './firebase.js';
import {
  onAuthStateChanged, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, updateProfile, signOut
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { doc, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

const modal = document.getElementById('modalAuth');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const btnLogin = document.getElementById('btnLogin');
const btnProfile = document.getElementById('btnProfile');
const closeAuth = document.getElementById('closeAuth');

btnLogin?.addEventListener('click', ()=> modal.classList.add('active'));
document.getElementById('showRegister')?.addEventListener('click', ()=>{
  document.getElementById('loginBox').classList.add('hidden');
  document.getElementById('registerBox').classList.remove('hidden');
});
document.getElementById('showLogin')?.addEventListener('click', ()=>{
  document.getElementById('registerBox').classList.add('hidden');
  document.getElementById('loginBox').classList.remove('hidden');
});
closeAuth?.addEventListener('click', ()=> modal.classList.remove('active'));

loginForm?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const email = e.target.email.value, pass = e.target.password.value;
  try{ await signInWithEmailAndPassword(auth,email,pass); modal.classList.remove('active'); }
  catch(err){ alert('Login gagal: '+err.message); }
});

registerForm?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const name=e.target.name.value, email=e.target.email.value, pass=e.target.password.value;
  try{
    const cred = await createUserWithEmailAndPassword(auth,email,pass);
    await updateProfile(cred.user,{displayName:name});
    await setDoc(doc(db,'users',cred.user.uid),{name,email,role:'anggota',joinedAt:serverTimestamp()});
    alert('Akun berhasil dibuat.'); modal.classList.remove('active');
  }catch(err){ alert('Gagal daftar: '+err.message); }
});

onAuthStateChanged(auth, (user)=>{
  if(user){ btnLogin?.classList.add('hidden'); btnProfile?.classList.remove('hidden'); btnProfile.textContent='Profil'; }
  else{ btnProfile?.classList.add('hidden'); btnLogin?.classList.remove('hidden'); }
});

export async function doLogout(){ await signOut(auth); }
