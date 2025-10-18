import { auth, db } from './firebase.js';
import { initDrive, uploadToDrive } from './gdrive.js';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';

const $ = (id)=>document.getElementById(id);
const allowedRoles = ['super_admin','admin_kegiatan'];

async function ensureRole(user){
  const snap = await getDoc(doc(db,'users',user.uid));
  const role = snap.exists()? (snap.data().role||'anggota'):'anggota';
  if(!allowedRoles.includes(role)){ alert('Akses ditolak.'); window.location.href='./index.html'; return false; }
  return true;
}

onAuthStateChanged(auth, async (user)=>{
  if(!user){ window.location.href='./index.html'; return; }
  await ensureRole(user);
});

$('umkmUpload')?.addEventListener('click', async ()=>{
  const nama=$('umkmNama').value.trim();
  const kategori=$('umkmKategori').value.trim();
  const deskripsi=$('umkmDesk').value.trim();
  const harga=$('umkmHarga').value.trim();
  const wa=$('umkmWA').value.replace(/\D/g,'');
  const toko=$('umkmToko').value.trim();
  const status=$('umkmStatus').value;
  const foto=$('umkmFoto').files[0];
  if(!nama||!wa){ alert('Nama & nomor WA wajib.'); return; }
  await initDrive();
  let urlFoto=''; if(foto) urlFoto = await uploadToDrive(foto,'umkm');
  await addDoc(collection(db,'umkm'),{ nama,kategori,deskripsi,harga,kontakWA:wa,linkToko:toko,urlFoto,status,uploader:auth.currentUser?.displayName||'Admin',createdAt:serverTimestamp() });
  alert('UMKM tersimpan.'); ['umkmNama','umkmKategori','umkmDesk','umkmHarga','umkmWA','umkmToko'].forEach(id=>{$(id).value='';}); $('umkmStatus').value='aktif'; $('umkmFoto').value='';
});
