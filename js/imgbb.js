const IMGBB_API_KEY = "d0a0d866377c1d4daa8cd9d937303b76";

export async function uploadToImgBB(file) {
  if (!file) return "";
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: "POST",
    body: formData
  });
  const data = await res.json();
  if (!data.success) {
    alert("Gagal upload gambar: " + data.error.message);
    return "";
  }
  return data.data.url;
}