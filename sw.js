/**
 * CC MOTOCRAFTS SERVICE WORKER (PWA)
 * Enables 0-Second Instant Loading, Offline Caching & App Install
 */

const CACHE_NAME = 'ccmotocrafts-v2.6.0';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/watermark.css',
  '/js/app.js',
  '/js/partner-dashboard.js',
  '/js/hts-engine1.js',
  '/js/hts-engine2.js',
  '/js/customer-portal.js',
  '/js/admin-portal.js',
  '/js/booking-app.js',
  '/manifest.json',
  '/assets/icon-192.png',
  '/assets/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[PWA SW] Pre-caching static assets for offline readiness');
      return cache.addAll(STATIC_ASSETS).catch(err => console.warn('[PWA SW] Cache warning:', err));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Stale-While-Revalidate Strategy for fast offline UX
  if (event.request.method !== 'GET') return;
  
  // Exclude API dynamic requests from service worker cache to ensure real-time telemetry
  if (event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
