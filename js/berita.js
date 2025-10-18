import { db } from './firebase.js';
import { collection, getDocs, orderBy, query, limit } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

const wrap = document.getElementById('beritaList');
export async function loadBerita(){
  if(!wrap) return;
  wrap.innerHTML = '<div class="card">Memuat berita…</div>';
  const snap = await getDocs(query(collection(db,'berita'), orderBy('createdAt','desc'), limit(6)));
  wrap.innerHTML = '';
  snap.forEach(d=>{
    const b=d.data();
    const el=document.createElement('div');
    el.className='card';
    el.innerHTML=`<h3>${b.judul||'-'}</h3><p class="muted">${b.penulis||'Admin'} • ${(b.tanggal&&b.tanggal.seconds)?new Date(b.tanggal.seconds*1000).toLocaleDateString('id-ID'):''}</p><p>${b.isi||''}</p>`;
    wrap.appendChild(el);
  });
}
loadBerita();
