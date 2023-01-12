console.log('here i come!')

// const initCache = () =>{
    
// }
// const tryNetwork = (req, timeout) =>{

// }
// const getFromCache = (req) =>{

// }


const cacheKey = "v1.001"

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(cacheKey).then(cache => {
        return cache.addAll([
          '/'
        ]);
      },(error)=>{
        console.log(error)
      })
    );
  });

  // eslint-disable-next-line no-restricted-globals
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(response => {
          return caches.open(cacheKey).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  });