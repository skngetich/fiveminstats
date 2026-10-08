// Offline support.
// - The app page is served from cache (instant, works offline). It is only
//   replaced when the page asks for an update check, so the cached copy is
//   always the version that is running and changes can be detected.
// - Other assets (icons, manifest) are stale-while-revalidate.
// Bump CACHE when the list of assets changes.
const CACHE = 'fiveminstats-v2';
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
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS.map(url => new Request(url, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  if (req.mode === 'navigate') {
    e.respondWith(caches.match(req, { ignoreSearch: true }).then(cached => cached || fetch(req)));
    return;
  }

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

// The page sends 'check-update'; if the online app differs from the cached one,
// cache the new version and reply 'update-available'.
self.addEventListener('message', e => {
  if (e.data !== 'check-update') return;
  e.waitUntil((async () => {
    const res = await fetch('./', { cache: 'no-cache' }).catch(() => null);
    if (!res?.ok) return; // offline: nothing to do
    const [forRoot, forIndex] = [res.clone(), res.clone()];
    const fresh = await res.text();
    const cache = await caches.open(CACHE);
    const old = await cache.match('./');
    const oldText = old ? await old.text() : null;
    if (fresh === oldText) return;
    await cache.put('./', forRoot);
    await cache.put('./index.html', forIndex);
    if (oldText !== null) e.source?.postMessage('update-available');
  })());
});
