import { db } from './firebase.js'; import { doc, getDoc, setDoc, updateDoc, collection, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js'; import { uploadToCloudinary } from './cloudinary.js'; import { qs, toast } from './ui.js'; import { isKetua } from './roles.js';
qs('#saveBrand').onclick=async()=>{ const nama=qs('#namaPortal').value.trim(); const file=qs('#logoUpload').files[0]; const ref=doc(db,'sistem','branding'); let payload={nama_portal:nama}; if(file){ const url=await uploadToCloudinary(file,'logo'); payload.logo=url;} const snap=await getDoc(ref); if(snap.exists()) await updateDoc(ref,payload); else await setDoc(ref,payload); toast('Branding diperbarui'); };
qs('#savePengumuman').onclick=async()=>{ const text=qs('#textPengumuman').value.trim(); await setDoc(doc(db,'pengumuman','utama'),{text}); toast('Pengumuman disimpan'); };
const panel=qs('#panelRole'); if(isKetua()) panel.style.display=''; if(isKetua()){ onSnapshot(collection(db,'users'), (snap)=>{ const list=qs('#listUser'); list.innerHTML=''; snap.forEach(d=>{ const u=d.data(); const row=document.createElement('div'); row.className='info-chip'; row.style.cssText='display:flex;justify-content:space-between;width:100%'; row.innerHTML=`<span>${u.nama||u.email||d.id}</span>
<select data-id="${d.id}" class="roleSel">
<option value="anggota"${u.role==='anggota'?' selected':''}>anggota</option>
<option value="kontributor"${u.role==='kontributor'?' selected':''}>kontributor</option>
<option value="sekretaris"${u.role==='sekretaris'?' selected':''}>sekretaris</option>
<option value="bendahara"${u.role==='bendahara'?' selected':''}>bendahara</option>
<option value="wakil_admin"${u.role==='wakil_admin'?' selected':''}>wakil_admin</option>
<option value="super_admin"${u.role==='super_admin'?' selected':''}>super_admin</option>
</select>`; list.append(row); }); list.querySelectorAll('.roleSel').forEach(sel=> sel.onchange=async(e)=>{ const uid=e.target.dataset.id; const role=e.target.value; await updateDoc(doc(db,'users',uid),{role}); toast('Role diperbarui'); }); }); }