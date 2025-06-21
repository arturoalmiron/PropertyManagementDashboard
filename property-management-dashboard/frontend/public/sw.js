const CACHE_NAME = 'property-mgmt-py-v1.0.0';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Files to cache immediately
const STATIC_FILES = [
    '/',
    '/static/js/bundle.js',
    '/static/css/main.css',
    '/manifest.json',
    '/favicon.ico',
    '/logo192.png',
    '/logo512.png'
];

// API endpoints to cache
const API_ENDPOINTS = [
    '/api/properties',
    '/api/tenants',
    '/api/payments',
    '/api/dashboard/stats'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('Service Worker: Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('Service Worker: Static files cached');
                return self.skipWaiting();
            })
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Handle API requests
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Clone response before caching
                    const responseClone = response.clone();

                    // Cache successful API responses
                    if (response.status === 200) {
                        caches.open(DYNAMIC_CACHE)
                            .then((cache) => {
                                cache.put(request, responseClone);
                            });
                    }

                    return response;
                })
                .catch(() => {
                    // Serve from cache if network fails
                    return caches.match(request);
                })
        );
        return;
    }

    // Handle static files and pages
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(request)
                    .then((response) => {
                        // Don't cache error responses
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone response before caching
                        const responseClone = response.clone();

                        caches.open(DYNAMIC_CACHE)
                            .then((cache) => {
                                cache.put(request, responseClone);
                            });

                        return response;
                    })
                    .catch(() => {
                        // Return offline page for navigation requests
                        if (request.destination === 'document') {
                            return caches.match('/offline.html');
                        }
                    });
            })
    );
});

// Background sync for failed API requests
self.addEventListener('sync', (event) => {
    console.log('Service Worker: Background sync triggered');

    if (event.tag === 'background-sync') {
        event.waitUntil(
            // Retry failed requests stored in IndexedDB
            retryFailedRequests()
        );
    }
});

// Push notifications for rent reminders
self.addEventListener('push', (event) => {
    console.log('Service Worker: Push notification received');

    const options = {
        body: event.data ? event.data.text() : 'Nueva notificación de PropMgmt PY',
        icon: '/logo192.png',
        badge: '/logo192.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'view',
                title: 'Ver detalles',
                icon: '/icons/view.png'
            },
            {
                action: 'close',
                title: 'Cerrar',
                icon: '/icons/close.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('PropMgmt PY', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    console.log('Service Worker: Notification clicked');

    event.notification.close();

    if (event.action === 'view') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Utility function to retry failed requests
async function retryFailedRequests() {
    // Implementation would depend on your IndexedDB storage
    // This is a placeholder for background sync functionality
    console.log('Retrying failed requests...');
}

// Update available notification
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('Service Worker: Registered successfully'); 