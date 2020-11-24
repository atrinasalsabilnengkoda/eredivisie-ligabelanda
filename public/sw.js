importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox){
  workbox.precaching.precacheAndRoute([
      { url: '/', revision: '1' },
      // html
      { url: '/index.html', revision: '1' },
      { url: '/pages/nav.html', revision: '1' },
      { url: '/pages/standings.html', revision: '1' },
      { url: '/pages/clubs.html', revision: '1' },
      { url: '/pages/favorite.html', revision: '1' },
      { url: '/pages/matches.html', revision: '1' },
      // img
      { url: '/images/icon.png', revision: '1' },
      { url: '/images/apple-touch-icon.png', revision: '1' },
      { url: '/images/maskable_icon.png', revision: '1' },
      { url: '/images/like.png', revision: '1' },
      { url: '/images/preloader.gif', revision: '1' },
      // css
      { url: '/css/clubs.css', revision: '1' },
      { url: '/css/standings.css', revision: '1' },
      { url: '/css/materialize.css', revision: '1' },
      { url: '/css/materialize.min.css', revision: '1' },
      { url: '/css/favorite.css', revision: '1' },
      { url: '/css/detailPage.css', revision: '1' },
      { url: '/css/matches.css', revision: '1' },
      // js
      { url: '/js/app.js', revision: '1' },
      { url: '/js/standings.js', revision: '1' },
      { url: '/js/clubs.js', revision: '1' },
      { url: '/js/detailTeam.js', revision: '1' },
      { url: '/js/favorite.js', revision: '1' },
      { url: '/js/matches.js', revision: '1' },
      { url: '/js/idb.js', revision: '1' },
      { url: '/js/registerSw.js', revision: '1' },
      { url: '/sw.js', revision: '1' },
      { url: '/push.js', revision: '1' },
      { url: '/manifest.json', revision: '1' },
  ]);


  workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
    );

    workbox.routing.registerRoute(
        new RegExp('/pages/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'pages',
        })
    );

    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'image',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                }),
                new workbox.expiration.Plugin({
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ]
        })
    );

    workbox.routing.registerRoute(
        /\.(?:js)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'js',
        })
    );

    }else
    console.log(`Workbox gagal dimuat`);


    self.addEventListener('push', event => {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    const options = {
        body: body,
        icon: '/images/icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});