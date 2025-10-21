
// js/app.js
import { listenDoc } from "./data.js";
import { setSrc, setText, toast } from "./ui.js";
import { uploadToCloudinary } from "./cloudinary.js";

listenDoc("sistem/branding", (d)=>{
  if(d?.logo) setSrc("#logoImg", d.logo);
  if(d?.nama_portal) setText("#portalName", d.nama_portal);
});

const logoInput = document.querySelector("#logoUpload");
if(logoInput){
  logoInput.addEventListener("change", async (e)=>{
    try{
      const file = e.target.files[0];
      if(!file) return;
      const url = await uploadToCloudinary(file, "logo");
      document.querySelector("#logoImg").src = url;
      toast("Logo diupload. Simpan URL ke Firestore via halaman Pengaturan.");
    }catch(err){ toast(err.message) }
  });
}
