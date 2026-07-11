/* Service worker for LI Document Database.
   Precaches the app shell so the app opens with no network at all;
   runtime-caches the OCR engine (tesseract.js from CDN) after first use. */
"use strict";

var SHELL_CACHE = "li-db-shell-v1";
var RUNTIME_CACHE = "li-db-runtime-v1";

var SHELL = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icons/icon.svg",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-512.png",
  "icons/apple-touch-icon.png"
];

/* Hosts the OCR engine is fetched from (see loadTess() in index.html).
   Their files are versioned/immutable, so cache-first is safe. */
var RUNTIME_HOSTS = ["cdn.jsdelivr.net", "tessdata.projectnaptha.com"];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(SHELL_CACHE)
      .then(function (c) { return c.addAll(SHELL); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== SHELL_CACHE && k !== RUNTIME_CACHE) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);

  // App shell navigations: network-first so updates arrive, cache fallback for offline.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(SHELL_CACHE).then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (hit) {
          return hit || caches.match("./");
        });
      })
    );
    return;
  }

  // OCR engine from CDN: cache-first (files are versioned, they never change).
  if (RUNTIME_HOSTS.indexOf(url.hostname) !== -1) {
    e.respondWith(
      caches.match(req).then(function (hit) {
        if (hit) return hit;
        return fetch(req).then(function (res) {
          if (res && (res.ok || res.type === "opaque")) {
            var copy = res.clone();
            caches.open(RUNTIME_CACHE).then(function (c) { c.put(req, copy); });
          }
          return res;
        });
      })
    );
    return;
  }

  // Same-origin static assets (icons, manifest): cache-first.
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(req).then(function (hit) {
        if (hit) return hit;
        return fetch(req).then(function (res) {
          if (res && res.ok) {
            var copy = res.clone();
            caches.open(SHELL_CACHE).then(function (c) { c.put(req, copy); });
          }
          return res;
        });
      })
    );
  }
});
