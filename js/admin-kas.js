import { auth, db } from './firebase.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

const $=(id)=>document.getElementById(id);

onAuthStateChanged(auth, (user)=>{ if(!user){window.location.href='./index.html';} });

$('kasSimpan')?.addEventListener('click', async ()=>{
  const tanggal=$('kasTanggal').value;
  const keterangan=$('kasKet').value;
  const jenis=$('kasJenis').value;
  const nominal=parseInt($('kasNominal').value||'0',10);
  if(!tanggal||!keterangan||!nominal){ alert('Lengkapi data kas.'); return; }
  await addDoc(collection(db,'kas'),{ tanggal:new Date(tanggal), keterangan, jenis, nominal, createdAt:serverTimestamp() });
  alert('Kas disimpan.'); ['kasTanggal','kasKet','kasNominal'].forEach(id=>{$(id).value='';}); $('kasJenis').value='masuk';
});
