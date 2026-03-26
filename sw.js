const CACHE_NAME = 'inventarios-pwa-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/tabla.html',
    '/style.css',
    '/script.js',
    '/manifest.json'
];

// Instalación: cachear archivos estáticos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activación: limpiar caches viejos
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Eliminando cache antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Estrategia: Network First con fallback a cache
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Clonar respuesta para cachear
                const responseToCache = response.clone();
                caches.open(CACHE_NAME)
                    .then(cache => {
                        // No cachear llamadas a APIs externas (para evitar datos obsoletos)
                        if (!event.request.url.includes('docs.google.com') && 
                            !event.request.url.includes('drive.proton.me')) {
                            cache.put(event.request, responseToCache);
                        }
                    });
                return response;
            })
            .catch(() => {
                // Si falla la red, buscar en cache
                return caches.match(event.request);
            })
    );
});