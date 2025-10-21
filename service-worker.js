
const CACHE_NAME="kartar-v7.4";
const urls=[
  "/","/index.html","/manifest.webmanifest",
  "/css/style.css",
  "/js/firebase.js","/js/guard.js","/js/ui.js","/js/data.js","/js/roles.js","/js/logout.js","/js/cloudinary.js","/js/marquee.js","/js/pasar.js","/js/berita.js","/js/kas.js",
  "/auth/login.html","/auth/register.html","/auth/forgot.html",
  "/pages/berita.html","/pages/kas.html","/pages/pengaturan.html",
  "/assets/icons/icon-192.png","/assets/icons/icon-512.png","/assets/icons/kt.svg"
];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(urls)))});
self.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME&&caches.delete(k))))) });
