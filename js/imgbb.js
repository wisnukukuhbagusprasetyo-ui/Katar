<!-- /js/imgbb.js -->
<script type="module">
// Upload single file ke ImgBB (return URL)
const IMGBB_API = "d0a0d866377c1d4daa8cd9d937303b76";

export async function uploadToImgBB(file){
  if(!file) return "";
  const fd = new FormData();
  fd.append("key", IMGBB_API);
  fd.append("image", file);
  const r = await fetch("https://api.imgbb.com/1/upload", { method:"POST", body:fd });
  const j = await r.json();
  if(!j?.data?.url) throw new Error("Gagal upload gambar");
  return j.data.url;
}
window.__IMGBB__ = { uploadToImgBB };
</script>