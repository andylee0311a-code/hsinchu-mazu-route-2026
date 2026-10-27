'use strict';
const CACHE='hsinchu-mazu-pwa-v1';
const CORE=['/offline.html','/manifest.webmanifest','/icons/icon-192.png','/icons/icon-512.png','/icons/icon-180.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)));self.skipWaiting();});
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith('hsinchu-mazu-pwa-')&&key!==CACHE)await caches.delete(key);await self.clients.claim();})()));
self.addEventListener('fetch',event=>{const req=event.request,url=new URL(req.url);if(req.method!=='GET'||url.origin!==self.location.origin)return;if(req.mode==='navigate'){event.respondWith(fetch(req).catch(()=>caches.match('/offline.html')));return;}if(CORE.includes(url.pathname))event.respondWith(caches.match(url.pathname).then(hit=>hit||fetch(req)));});
