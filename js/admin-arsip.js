import { auth } from './firebase.js';
import { initDrive, uploadToDrive } from './gdrive.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { db } from './firebase.js';
import { doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

const $=(id)=>document.getElementById(id);
onAuthStateChanged(auth, (u)=>{ if(!u){window.location.href='./index.html';} });

async function upload(folderKey, metaCol, inputId, judulId){
  await initDrive();
  const file = $(inputId).files[0]; if(!file){ alert('Pilih file.'); return; }
  const url = await uploadToDrive(file, folderKey);
  const id = Date.now().toString();
  await setDoc(doc(db, metaCol, id), { judul: $(judulId).value || file.name, fileURL: url, createdAt: new Date() });
  alert('Dokumen diupload.');
}

$('uploadSurat')?.addEventListener('click', ()=>upload('surat','surat','fileSurat','judulSurat'));
$('uploadProposal')?.addEventListener('click', ()=>upload('proposal','proposal','fileProposal','judulProposal'));
$('uploadLaporan')?.addEventListener('click', ()=>upload('laporan','laporan','fileLaporan','judulLaporan'));
