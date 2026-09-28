// Offline support: serve the app from cache, refresh the cache in the background.
// Bump CACHE when the list of assets changes.
const CACHE = 'fiveminstats-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Stale-while-revalidate: answer from cache instantly (works offline),
// and fetch a fresh copy for next time when online.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const network = fetch(req).then(async res => {
    if (res.ok) {
      const copy = res.clone();
      await (await caches.open(CACHE)).put(req, copy);
    }
    return res;
  });
  e.waitUntil(network.catch(() => {}));
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(cached => cached || network)
  );
});
