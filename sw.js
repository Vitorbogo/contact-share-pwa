const cacheName = 'notes-cache'

const filesToCache = [
  '/',
  '/index.html',
  '/script.js',
  '/icon.png',
  '/favicon.ico',
  '/sw.js',
  '/manifest.json',
  'README.md',
]

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache)
    })
  )
})

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (key !== cacheName) {
            return caches.delete(key)
          }
        })
      )
    })
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request)
    })
  )
})
