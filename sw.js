const CACHE_NAME = 'telsur-dashboard-v7'; // Versión 6 para forzar actualización

// Instalar el Service Worker
self.addEventListener('install', (e) => {
    self.skipWaiting(); // Fuerza la activación inmediata
});

// Activar y limpiar cachés viejas
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) return caches.delete(key);
            }));
        })
    );
    self.clients.claim();
});

// ESTO ES LO QUE EXIGE CHROME PARA INSTALAR LA APP:
self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request).catch(() => {
            return caches.match(e.request);
        })
    );
});
