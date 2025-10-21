import { auth, db } from './firebase.js';
import { collection, onSnapshot, doc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { qs } from './ui.js';
import { CURRENT_ROLE } from './roles.js';

const grid = qs('#produkGrid');
const money = n => Number(n || 0).toLocaleString('id-ID');

// Render list (realtime)
onSnapshot(collection(db,'pasar'), (snap)=>{
  grid.innerHTML='';
  snap.docs.sort((a,b)=>(b.data().timestamp||0)-(a.data().timestamp||0)).forEach(d=>{
    const p=d.data();
    const card=document.createElement('div');
    card.className='produk-card';
    card.innerHTML = \`
      <img src="\${p.foto || '/assets/icons/kt.svg'}" alt="\${p.nama || ''}">
      <div class="pad">
        <h4>\${p.nama || ''}</h4>
        <p>Rp \${money(p.harga)}</p>
        <p class="desc">\${p.deskripsi || ''}</p>
        <a class="btn-wa" target="_blank"
           href="https://wa.me/\${p.wa}?text=\${encodeURIComponent('Halo saya ingin membeli ' + (p.nama||'produk') + ' (Rp ' + money(p.harga) + ')')}">
           🛒 Beli via WhatsApp</a>
      </div>\`;
    // Hapus produk (owner / ketua / wakil)
    if (auth.currentUser?.uid === p.owner || ["super_admin","wakil_admin"].includes(CURRENT_ROLE)) {
      const del=document.createElement('button'); del.textContent='🗑️'; del.className='btn-del';
      del.onclick=async()=>{ if(confirm('Hapus produk ini?')) await deleteDoc(doc(db,'pasar', d.id)); };
      card.querySelector('.pad').append(del);
    }
    grid.append(card);
  });
});

// Counters
import { onSnapshot as onS, collection as coll } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
onS(coll(db,'pasar'), s=> qs('#countPasar').textContent = s.size);
onS(coll(db,'berita'), s=> qs('#countBerita').textContent = s.size);
onS(coll(db,'kas'), s=> {
  let masuk=0, keluar=0;
  s.forEach(x=>{ const d=x.data(); if(d.tipe==='keluar') keluar+=Number(d.jumlah||0); else masuk+=Number(d.jumlah||0); });
  qs('#countKas').textContent = 'Rp ' + Number(masuk-keluar).toLocaleString('id-ID');
});
