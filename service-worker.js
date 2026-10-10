const CACHE_NAME = 'agriguide-v19';
const PRECACHE_FILES = [
  './',
  './index.html',
  './agri-styles.css',
  './agri-app.jsx',
  './supabase-config.js',
  './manifest.json',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './news.json',
  './crop-photo-credits.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(PRECACHE_FILES.map(async (file) => {
      const assetUrl = new URL(file, self.registration.scope);
      const freshUrl = new URL(assetUrl);
      freshUrl.searchParams.set('precache', CACHE_NAME);
      const response = await fetch(freshUrl, { cache: 'reload' });
      if (!response.ok) throw new Error(`Unable to cache ${file}: ${response.status}`);
      await cache.put(assetUrl, response);
    }));
  })());
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  if (new URL(event.request.url).pathname.endsWith('/news.json')) {
    event.respondWith(caches.open(CACHE_NAME).then((cache) => fetch(event.request)
      .then((response) => {
        if (!response.ok) return response;
        return cache.put(event.request, response.clone()).then(() => response);
      })
      .catch((error) => cache.match(event.request).then((cached) => {
        if (cached) return cached;
        throw error;
      }))));
    return;
  }
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
    const copy = response.clone();
    return caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy).then(() => response));
  })));
});