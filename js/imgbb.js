// =====================================================
// IMGBB Upload (v5.2) – Pakai API key kamu
// =====================================================
const IMGBB_API_KEY = "d0a0d866377c1d4daa8cd9d937303b76";

export async function uploadToImgBB(file) {
  if (!file) throw new Error("File tidak ditemukan untuk diupload.");
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (!allowed.includes(file.type)) {
    alert("Format file tidak didukung. Gunakan JPG, PNG, atau WEBP.");
    return "";
  }
  const formData = new FormData();
  formData.append("image", file);
  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    if (!data.success) {
      alert("Upload gagal: " + (data.error?.message || "Tidak diketahui"));
      return "";
    }
    return data.data.url;
  } catch (err) {
    alert("Gagal mengunggah gambar: " + err.message);
    return "";
  }
}