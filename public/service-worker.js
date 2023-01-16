console.log('here i come!')

// const initCache = () =>{
    
// }
// const tryNetwork = (req, timeout) =>{

// }
// const getFromCache = (req) =>{

// }


const cacheKey = "v1.9"

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(cacheKey).then(cache => {
        return cache.addAll([
          '/src',
          '/public'
        ]);
      },(error)=>{
        console.log(error)
      })
    );
  });

  // eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then((keyList) => {
        // eslint-disable-next-line array-callback-return
        return Promise.all(keyList.map((key)=>{
          if(key !== cacheKey){
            return caches.delete(key)
          }
        }))
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