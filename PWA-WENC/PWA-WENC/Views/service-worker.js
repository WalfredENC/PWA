var nombreCacheEstaticos = "cacheEstaticos1"
var archivosEstaticos = [
    "/lib/jquery/dist/jquery.min.js",
    "/lib/bootstrap/dist/js/bootstrap.bundle.min.js",
    "/js/menu.js",
    "js/generic.js",
    "/img/loading.gif"
]

self.addEventListener("install", event => {
    console.log("Evento Install")
    event.waitUntil(
        caches.open(nombreCacheEstaticos).then(cache => {
            return cache.addAll(archivosEstaticos)
        })
    )
})

self.addEventListener("activate", event => {
    console.log("Evento Activate")
    event.waitUntil(self.clients.claim())
})

self.addEventListener("fetch", event => {
    const respuesta = caches.match(event.request).then(res => {
        if (res) return res;
        else {
            return fetch(event.request).then(response => {
                return response;
            })
        }
    }).catch(err => {
        return null
    })
    event.respondWith(fetch(event.request.url))
})