/* Pet Shop Premium — service worker
   Guarda la app para que abra sin internet.
   Al publicar cambios, sube el número de VERSION para que los equipos se actualicen. */
const VERSION = 'petshop-v1';
const ASSETS = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
  'icons/favicon-64.png',
  "img/productos/A-001.webp",
  "img/productos/A-002.webp",
  "img/productos/A-003.webp",
  "img/productos/F-001.webp",
  "img/productos/F-002.webp",
  "img/productos/G-001.webp",
  "img/productos/G-002.webp",
  "img/productos/O-001.webp",
  "img/productos/O-002.webp",
  "img/productos/P-001.webp",
  "img/productos/P-002.webp",
  "img/productos/P-003.webp",
  "img/productos/P-004.webp",
  "img/productos/S-001.webp",
  "img/productos/S-002.webp",
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  // La página: primero la red (para recibir cambios), sin internet la guardada.
  if (req.mode === 'navigate'){
    e.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put('index.html', copy)); return res; })
        .catch(() => caches.match('index.html').then(r => r || caches.match('./')))
    );
    return;
  }

  // Íconos, fotos y demás: lo guardado al instante, y se actualiza por detrás.
  e.respondWith(
    caches.match(req).then(cached => {
      const net = fetch(req).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => cached);
      return cached || net;
    })
  );
});
