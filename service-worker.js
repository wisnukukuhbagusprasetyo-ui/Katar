
const VERSION = 'v7.3-ios26';
const ASSETS = [
  '/', '/index.html',
  '/css/style.css','/css/auth-anim.css',
  '/js/firebase.js','/js/config.js','/js/auth.js','/js/guard.js','/js/ui.js','/js/motion.js','/js/cloudinary.js','/js/app.js',
  '/assets/icons/icon-192.png','/assets/icons/icon-512.png','/assets/icons/kt.svg',
  '/auth/portal.html',
  '/pages/berita.html','/pages/kegiatan.html','/pages/kas.html','/pages/forum.html','/pages/anggota.html','/pages/laporan.html','/pages/umkm.html','/pages/pengaturan.html','/pages/academy.html','/pages/sertifikat.html'
];
self.addEventListener('install', e=>{ e.waitUntil(caches.open(VERSION).then(c=>c.addAll(ASSETS))); });
self.addEventListener('activate', e=>{ e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==VERSION && caches.delete(k))))); });
self.addEventListener('fetch', e=>{
  const url = new URL(e.request.url);
  if(ASSETS.includes(url.pathname)) e.respondWith(caches.match(e.request).then(r=> r || fetch(e.request)));
});
