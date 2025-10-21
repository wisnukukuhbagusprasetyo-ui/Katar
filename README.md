
# Karang Taruna Portal v7.1 (Single • Firebase + Cloudinary + PWA)

## Cara Pakai
1) Deploy folder ini ke Netlify / Vercel / Firebase Hosting.
2) Edit `js/cloudinary.js`: isi `YOUR_CLOUD_NAME` & `YOUR_UPLOAD_PRESET`.
3) Buat dokumen Firestore `sistem/branding`:
{
  "nama_portal": "Karang Taruna Cilosari Barat",
  "logo": "https://.../logo.png"
}
4) Buka `/auth/register.html` untuk membuat akun pertama, lalu login.

## PWA
- `manifest.webmanifest`, `service-worker.js` sudah aktif.
- Install di HP: Add to Home Screen → tampil splash & offline.

## Halaman
- `/index.html` (dashboard)
- `/auth/login.html`, `/auth/register.html`, `/auth/forgot.html`
- `/pages/` (kas, kegiatan, forum, academy, sertifikat, anggota, pengaturan, umkm, laporan)

## Catatan
- Semua halaman non-auth terlindungi guard (wajib login).
- Cloudinary untuk upload media (logo, foto profil, UMKM, galeri).
- Tambahkan Firestore Rules untuk produksi (role-based access).


## v7.2 Update
- 🚪 Tombol Logout aktif di dashboard (index.html)
- Integrasi penuh dengan Firebase Auth + Guard
- Otomatis redirect ke login setelah keluar akun
