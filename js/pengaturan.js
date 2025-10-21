
import { db } from "../js/firebase.js";
import { doc, getDoc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { qs, toast } from "../js/ui.js";
import { uploadToCloudinary } from "../js/cloudinary.js";

const area = document.getElementById("contentArea");
area.innerHTML = `
  <div class="card-glass span-6">
    <p class="card-title">Identitas Portal</p>
    <div class="input-wrap"><label>Nama Portal</label><input id="namaPortal" type="text"></div>
    <div class="input-wrap"><label>Logo</label><input id="logoUpload" type="file" accept="image/*"></div>
    <div style="margin-top:10px"><button id="save" class="btn-glass">Simpan</button></div>
  </div>
  <div class="card-glass span-6">
    <p class="card-title">Pratinjau</p>
    <img id="previewLogo" class="logo-glow" src="../assets/icons/kt.svg" alt="logo" style="width:72px;height:72px">
    <div class="info-chip" id="previewName">Karang Taruna Cilosari Barat</div>
  </div>
`;

async function loadBranding(){
  const ref = doc(db, "sistem", "branding");
  const snap = await getDoc(ref);
  if(snap.exists()){
    const d = snap.data();
    qs("#namaPortal").value = d.nama_portal||"";
    qs("#previewName").textContent = d.nama_portal||"Karang Taruna Cilosari Barat";
    if(d.logo) qs("#previewLogo").src = d.logo;
  }else{
    await setDoc(ref, { nama_portal:"Karang Taruna Cilosari Barat" });
  }
}
loadBranding();

qs("#save").addEventListener("click", async ()=>{
  const ref = doc(db, "sistem", "branding");
  const nama = qs("#namaPortal").value.trim();
  let logoUrl = null; const file = qs("#logoUpload").files[0];
  if(file) logoUrl = await uploadToCloudinary(file, "logo");
  const payload = { nama_portal:nama };
  if(logoUrl) payload.logo = logoUrl;
  await updateDoc(ref, payload);
  toast("Pengaturan disimpan");
  loadBranding();
});
