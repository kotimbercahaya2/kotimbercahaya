importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js')

workbox.core.skipWaiting()
workbox.core.clientsClaim()
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)
workbox.precaching.cleanupOutdatedCaches()

workbox.routing.setDefaultHandler(
    new workbox.strategies.NetworkFirst({
        cacheName: 'default'
    })
)

workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://fonts.gstatic.com' || url.origin === 'https://fonts.googleapis.com',
    new workbox.strategies.CacheFirst({
        cacheName: 'fonts',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 14
            })
        ]
    })
)

workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 3
            })
        ]
    })
)

workbox.routing.registerRoute(
    ({request}) => request.destination === 'document',
    new workbox.strategies.NetworkFirst({
        cacheName: 'pages',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 3
            })
        ]
    })
)

workbox.routing.registerRoute(
    ({request}) => request.destination === 'script' || request.destination === 'style',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'resources'
    })
)

// for development purposes

workbox.routing.registerRoute(
    ({url}) => url.pathname.includes('browser-sync'),
    new workbox.strategies.NetworkOnly(),
    'GET'
)

workbox.routing.registerRoute(
    ({url}) => url.pathname.includes('browser-sync'),
    new workbox.strategies.NetworkOnly(),
    'POST'
)
