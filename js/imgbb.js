// ===== /js/imgbb.js =====
// Fungsi upload gambar ke ImgBB
// Key kamu: d0a0d866377c1d4daa8cd9d937303b76

export async function uploadToImgBB(file) {
  const apiKey = "d0a0d866377c1d4daa8cd9d937303b76";
  if (!file) {
    alert("⚠️ Tidak ada file yang dipilih!");
    return "";
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    // opsional: tambahkan expiration (misal 600 detik = 10 menit)
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      console.log("✅ Upload sukses:", data.data.url);
      alert("✅ Gambar berhasil diupload!");
      return data.data.url;
    } else {
      console.error("❌ Gagal upload ke ImgBB:", data);
      alert("❌ Upload gagal: " + (data.error?.message || "Kesalahan tak dikenal"));
      return "";
    }
  } catch (err) {
    console.error("❌ Error upload ImgBB:", err);
    alert("⚠️ Upload gambar gagal. Periksa koneksi internet atau API key.");
    return "";
  }
}