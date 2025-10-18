// ===== /js/imgbb.js =====
// Upload gambar ke ImgBB dan kembalikan URL gambar siap pakai
// Gunakan API Key kamu langsung (AMAN, tidak butuh token login)

export async function uploadToImgBB(file) {
  const apiKey = "d0a0d866377c1d4daa8cd9d937303b76";

  if (!file) {
    alert("⚠️ Tidak ada file yang dipilih!");
    return "";
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    // Kirim request upload ke ImgBB
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    // === Jika sukses ===
    if (data.success && data.data) {
      const imgData = data.data;
      const bestURL =
        imgData?.medium?.url ||
        imgData?.image?.url ||
        imgData?.display_url ||
        imgData?.url;

      console.log("✅ Upload sukses:", bestURL);
      console.log("🧾 Respon lengkap ImgBB:", data);

      alert("✅ Gambar berhasil diunggah ke ImgBB!");
      return bestURL;
    }

    // === Jika gagal ===
    console.error("❌ Gagal upload ke ImgBB:", data);
    alert("❌ Upload gagal: " + (data.error?.message || "Periksa API key atau koneksi"));
    return "";
  } catch (err) {
    console.error("❌ Error upload ImgBB:", err);
    alert("⚠️ Upload gagal. Periksa koneksi internet atau format file.");
    return "";
  }
}