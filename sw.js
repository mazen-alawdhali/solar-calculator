const CACHE_NAME = 'solar-calc-v7-cache';
const urlsToCache = [
  '/',
  '/index.html',
  '/site.webmanifest',
  '/favicon.ico',
  '/favicon.svg',
  '/favicon-96x96.png',
  '/apple-touch-icon.png'
];

// تنصيب التطبيق وتخزين الملفات في ذاكرة الجوال
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('تم حفظ الملفات للعمل أوفلاين');
        return cache.addAll(urlsToCache);
      })
  );
});

// اعتراض الطلبات وتقديم النسخة المخزنة عند انقطاع الإنترنت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجد الملف في الذاكرة، قدمه. وإلا، اطلبه من الإنترنت
        return response || fetch(event.request);
      })
  );
});
