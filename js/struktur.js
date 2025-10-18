import { db } from './firebase.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

const wrap = document.getElementById('strukturList');
export async function loadStruktur(){
  if(!wrap) return;
  wrap.innerHTML='';
  const snap = await getDocs(collection(db,'struktur'));
  snap.forEach(d=>{
    const s=d.data(); const el=document.createElement('div');
    el.className='card';
    el.innerHTML=`<strong>${s.nama||'-'}</strong><br><span class="muted">${s.jabatan||''}</span>`;
    wrap.appendChild(el);
  });
}
loadStruktur();
