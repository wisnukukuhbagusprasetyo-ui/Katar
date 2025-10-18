import { db } from './firebase.js';
import { collection, getDocs, orderBy, query, limit } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

const wrap = document.getElementById('galeriList');
export async function loadGaleri(){
  if(!wrap) return;
  wrap.innerHTML='';
  const snap = await getDocs(query(collection(db,'galeri'), orderBy('createdAt','desc'), limit(18)));
  snap.forEach(d=>{
    const g=d.data(); const img=document.createElement('img');
    img.src=g.url; img.alt=g.caption||''; wrap.appendChild(img);
  });
}
loadGaleri();
