var C='debts-v2';
self.addEventListener('install',function(e){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',function(e){
  var r=e.request;if(r.method!=='GET')return;
  var u=new URL(r.url);if(u.origin!==location.origin)return;
  e.respondWith(fetch(r).then(function(res){var c=res.clone();caches.open(C).then(function(k){k.put(r,c)});return res}).catch(function(){return caches.match(r).then(function(m){return m||caches.match('./')})}));
});
