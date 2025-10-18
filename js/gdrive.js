// ============ IMGBB UPLOAD HANDLER ============
// Pastikan env.js sudah dimuat terlebih dahulu sebelum file ini
// dan sudah memiliki window.__IMGBB.apiKey

export async function uploadToImgBB(file) {
  // Validasi dasar
  if (!file) throw new Error("File tidak ditemukan untuk diupload.");
  const key = window.__IMGBB?.apiKey;
  if (!key) throw new Error("API Key ImgBB belum diatur di env.js");

  // Cek tipe file
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (!allowed.includes(file.type)) {
    alert("Format file tidak didukung. Gunakan JPG, PNG, atau WEBP.");
    return "";
  }

  // Buat FormData
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (!data.success) {
      console.error("ImgBB Error:", data);
      alert("Upload gagal: " + data.error?.message);
      return "";
    }

    const imageUrl = data.data.url;
    console.log("[ImgBB] Upload sukses:", imageUrl);
    return imageUrl;
  } catch (err) {
    console.error("Upload Error:", err);
    alert("Gagal mengunggah gambar: " + err.message);
    return "";
  }
}