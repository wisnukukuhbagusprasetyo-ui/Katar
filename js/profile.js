import { auth, db } from './firebase.js';
import { doc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { updateProfile, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { initDrive, uploadToDrive } from './gdrive.js';
import { doLogout } from './auth.js';

const modal = document.getElementById('modalProfile');
const btnProfile = document.getElementById('btnProfile');
const closeBtn = document.getElementById('closeProfile');
const photo = document.getElementById('profilePhoto');
const upload = document.getElementById('uploadPhoto');
const nameInput = document.getElementById('profileName');
const emailInput = document.getElementById('profileEmail');
const saveBtn = document.getElementById('saveProfile');
const logoutBtn = document.getElementById('logoutBtn');

btnProfile?.addEventListener('click', ()=> modal.classList.add('active'));
closeBtn?.addEventListener('click', ()=> modal.classList.remove('active'));

onAuthStateChanged(auth, (user)=>{
  if(user){ nameInput.value=user.displayName||''; emailInput.value=user.email||''; photo.src=user.photoURL||'./assets/user.svg'; }
});

saveBtn?.addEventListener('click', async ()=>{
  const u=auth.currentUser; if(!u) return;
  let photoURL = u.photoURL;
  if(upload.files[0]){ await initDrive(); photoURL = await uploadToDrive(upload.files[0],'profil'); }
  await updateProfile(u,{displayName:nameInput.value, photoURL});
  await updateDoc(doc(db,'users',u.uid),{name:nameInput.value, photoURL});
  alert('Profil diperbarui.'); modal.classList.remove('active');
});

logoutBtn?.addEventListener('click', async ()=>{ await doLogout(); modal.classList.remove('active'); });
