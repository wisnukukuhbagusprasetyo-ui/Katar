import { db } from './firebase.js';
import { collection, getDocs, orderBy, query } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

const listEl = document.getElementById('umkmList');
function waLink(number, namaUsaha){
  const base = `https://wa.me/${number}`;
  const text = `Halo%20saya%20tertarik%20dengan%20${encodeURIComponent(namaUsaha)}.%20Boleh%20info%20lebih%20lanjut?`;
  return `${base}?text=${text}`;
}

async function loadUMKM(){
  if(!listEl) return;
  listEl.innerHTML = '<div class="card">Memuat UMKM…</div>';
  const q = query(collection(db,'umkm'), orderBy('createdAt','desc'));
  const snap = await getDocs(q);
  listEl.innerHTML = '';
  snap.forEach(doc=>{
    const u = doc.data();
    if(u.status && u.status !== 'aktif') return;
    const card = document.createElement('div');
    card.className = 'card umkm-card';
    card.innerHTML = `
      <img src="${u.urlFoto || './assets/user.svg'}" alt="${u.nama || ''}" class="umkm-foto" />
      <h3>${u.nama || '-'}</h3>
      ${u.kategori ? `<p class="muted">${u.kategori}</p>` : ''}
      ${u.deskripsi ? `<p>${u.deskripsi}</p>` : ''}
      ${u.harga ? `<p><strong>${u.harga}</strong></p>` : ''}
      <div class="umkm-links">
        ${u.kontakWA ? `<a class="btn primary" target="_blank" href="${waLink(u.kontakWA, u.nama || 'produk')}">💬 WhatsApp</a>` : ''}
        ${u.linkToko ? `<a class="btn outline" target="_blank" href="${u.linkToko}">🌐 Lihat Toko</a>` : ''}
      </div>
    `;
    listEl.appendChild(card);
  });
}
loadUMKM();
