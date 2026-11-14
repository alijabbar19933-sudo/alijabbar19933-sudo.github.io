var C='debts-v3';
var LIBS=['app','auth','firestore'].map(function(n){return 'https://www.gstatic.com/firebasejs/10.12.2/firebase-'+n+'-compat.js'});
self.addEventListener('install',function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(C).then(function(k){
    return Promise.all(LIBS.map(function(u){return fetch(u,{mode:'no-cors'}).then(function(r){return k.put(u,r)}).catch(function(){})}));
  }));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}));
});
self.addEventListener('fetch',function(e){
  var r=e.request;if(r.method!=='GET')return;
  var u=new URL(r.url);
  if(u.hostname==='www.gstatic.com'&&u.pathname.indexOf('/firebasejs/')===0){
    e.respondWith(caches.match(r.url).then(function(m){
      return m||fetch(r).then(function(res){var c=res.clone();caches.open(C).then(function(k){k.put(r.url,c)});return res});
    }));
    return;
  }
  if(u.origin!==location.origin)return;
  e.respondWith(fetch(r).then(function(res){var c=res.clone();caches.open(C).then(function(k){k.put(r,c)});return res}).catch(function(){return caches.match(r).then(function(m){return m||caches.match('./')})}));
});
