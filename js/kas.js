import { auth, db } from './firebase.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { collection, getDocs, orderBy, query } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

const sec = document.getElementById('kas'); const menu = document.getElementById('kasMenu');
const list = document.getElementById('kasList'); const totalEl = document.getElementById('totalKas');

onAuthStateChanged(auth, async (user)=>{
  if(user){ sec?.classList.remove('hidden'); menu?.classList.remove('hidden'); loadKas(); }
  else{ sec?.classList.add('hidden'); menu?.classList.add('hidden'); }
});

async function loadKas(){
  if(!list) return;
  const q = query(collection(db,'kas'), orderBy('tanggal','desc'));
  const snap = await getDocs(q);
  let total=0, rows='';
  snap.forEach(d=>{
    const k = d.data(); const n=Number(k.nominal||0);
    total += (k.jenis==='masuk'? n : -n);
    const t = (k.tanggal && k.tanggal.seconds) ? new Date(k.tanggal.seconds*1000).toLocaleDateString('id-ID') : '';
    rows += `<tr><td>${t}</td><td>${k.keterangan||''}</td><td>${k.jenis||''}</td><td>Rp ${n.toLocaleString('id-ID')}</td></tr>`;
  });
  list.innerHTML = `<table class="table"><thead><tr><th>Tanggal</th><th>Keterangan</th><th>Jenis</th><th>Nominal</th></tr></thead><tbody>${rows}</tbody></table>`;
  totalEl.textContent = 'Rp ' + total.toLocaleString('id-ID');
}
