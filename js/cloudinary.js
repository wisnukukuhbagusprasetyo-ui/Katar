
export const CLOUD_NAME = "YOUR_CLOUD_NAME";
export const UPLOAD_PRESET = "YOUR_UPLOAD_PRESET";
export async function uploadImage(file){
  if(!CLOUD_NAME || !UPLOAD_PRESET) throw new Error("Cloudinary belum dikonfigurasi.");
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", UPLOAD_PRESET);
  const r = await fetch(url, { method:"POST", body: fd });
  if(!r.ok) throw new Error("Upload gagal");
  return r.json();
}
