// Offline shell for the PVF pack list. Stale-while-revalidate: serve from
// cache immediately (freezer has no signal), refresh the cache in the
// background whenever the network is there.
var CACHE = 'pvf-pack-shell-v1';

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return c.addAll(['./', './index.html', './sw.js']);
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  // Network-first when online so shell fixes reach the phone on the NEXT
  // open (stale-while-revalidate lagged one visit); cache when offline.
  e.respondWith(fetch(e.request).then(function (resp) {
    if (resp && resp.ok) {
      var copy = resp.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
    }
    return resp;
  }).catch(function () {
    return caches.match(e.request, { ignoreSearch: true });
  }));
});
