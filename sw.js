var V="trilha-v1.1.0";
var F=["./","index.html","manifest.webmanifest","icon.svg"];

self.addEventListener("install",function(e){
  e.waitUntil(caches.open(V).then(function(c){return c.addAll(F)}).then(function(){return self.skipWaiting()}));
});

self.addEventListener("activate",function(e){
  e.waitUntil(caches.keys().then(function(k){
    return Promise.all(k.filter(function(n){return n!==V}).map(function(n){return caches.delete(n)}));
  }).then(function(){return self.clients.claim()}));
});

self.addEventListener("fetch",function(e){
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(r){
    return r||fetch(e.request).catch(function(){return caches.match("index.html")});
  }));
});
