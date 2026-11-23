/* Photon Production: site behaviour (shared by EN + AR pages) */
(function () {
  "use strict";

  var LANG = (document.documentElement.lang || "en").slice(0, 2);
  var T = {
    en: {
      all: "All", motion: "Motion Graphics", vfx: "VFX", "3d": "3D Design", post: "Post Production",
      vertical: "Vertical", watchOnVimeo: "Watch on Vimeo ↗", copied: "Copied!", play: "Play"
    },
    ar: {
      all: "الكل", motion: "موشن جرافيك", vfx: "مؤثرات بصرية", "3d": "تصميم ثلاثي الأبعاد", post: "ما بعد الإنتاج",
      vertical: "عمودي", watchOnVimeo: "شاهد على Vimeo ↗", copied: "تم النسخ!", play: "تشغيل"
    }
  }[LANG] || {};

  var VIDEOS = (window.PHOTON_VIDEOS || []).filter(function (v) { return !v.hidden; });
  var THUMBS = window.PHOTON_THUMBS || {};
  var USER = window.PHOTON_VIMEO_USER || "bugahhoos";

  function thumb(id, size) {
    var base = THUMBS[String(id)];
    return base ? base + (size || "960x540") : "";
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Per-language text from videos.js (e.g. v.ar.client), falling back to English
  function loc(v, key) { return (v[LANG] && v[LANG][key]) || v[key]; }

  /* ---------- Header: scrolled state + mobile menu + active link ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() { if (header) header.classList.toggle("scrolled", window.scrollY > 20); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  var menuBtn = document.querySelector(".menu-btn");
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      menuBtn.setAttribute("aria-expanded", open);
    });
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  if ("IntersectionObserver" in window && navLinks.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    navLinks.forEach(function (a) { var s = document.querySelector(a.getAttribute("href")); if (s) spy.observe(s); });
  }

  /* ---------- Hero mosaic ---------- */
  var mosaic = document.querySelector(".hero-mosaic");
  if (mosaic && VIDEOS.length) {
    var ids = VIDEOS.map(function (v) { return v.id; });
    for (var c = 0; c < 4; c++) {
      var col = document.createElement("div"); col.className = "mosaic-col";
      var list = ids.slice(c * 4).concat(ids.slice(0, c * 4)).slice(0, 6);
      list = list.concat(list); // duplicated for seamless loop
      col.innerHTML = list.map(function (id) {
        return '<img src="' + thumb(id, "640x360") + '" alt="" loading="lazy" decoding="async">';
      }).join("");
      mosaic.appendChild(col);
    }
  }

  /* ---------- Work grid ---------- */
  var grid = document.getElementById("work-grid");
  var filtersEl = document.getElementById("filters");
  var CATS = ["all", "motion", "vfx", "3d", "post"];
  var current = "all";

  function cardHTML(v) {
    var vertical = v.h > v.w;
    var tags = (v.cats || []).slice(0, 2).map(function (c) { return '<span class="tag">' + esc(T[c] || c) + "</span>"; }).join("");
    var meta = [loc(v, "client"), v.year].filter(Boolean).map(esc).join(" · ");
    return (
      '<button class="card reveal' + (v.featured ? " is-featured" : "") + (v.wide ? " is-wide" : "") + '" data-id="' + v.id + '" data-layout="' + (v.featured ? "is-featured" : v.wide ? "is-wide" : "") + '" data-cats="' + esc((v.cats || []).join(" ")) + '" aria-label="' + esc(T.play + ": " + v.title) + '">' +
        '<div class="card-media">' +
          '<img src="' + (v.thumbUrl || thumb(v.id, v.featured ? "1280x720" : "960x540")) + '" alt="" loading="lazy" decoding="async">' +
          (vertical ? '<span class="badge-vertical">' + esc(T.vertical) + "</span>" : "") +
          '<div class="card-tags">' + tags + "</div>" +
          '<span class="play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 4.5v15l13-7.5z"/></svg></span>' +
        "</div>" +
        '<div class="card-info"><div><h3 class="card-title" dir="auto">' + esc(v.title) + '</h3><div class="card-meta">' + meta + "</div></div></div>" +
      "</button>"
    );
  }

  function renderFilters() {
    if (!filtersEl) return;
    filtersEl.innerHTML = CATS.map(function (c) {
      var n = c === "all" ? VIDEOS.length : VIDEOS.filter(function (v) { return (v.cats || []).indexOf(c) > -1; }).length;
      return '<button class="filter" data-cat="' + c + '" aria-pressed="' + (c === current) + '">' + esc(T[c] || c) + '<span class="count">' + n + "</span></button>";
    }).join("");
  }

  function applyFilter() {
    if (!grid) return;
    grid.querySelectorAll(".card").forEach(function (card) {
      var show = current === "all" || card.dataset.cats.split(" ").indexOf(current) > -1;
      card.classList.toggle("is-hidden", !show);
      // Big/wide cards only keep their size when viewing "All" (filtered lists stay a tidy grid)
      if (card.dataset.layout) card.classList.toggle(card.dataset.layout, current === "all");
    });
    filtersEl && filtersEl.querySelectorAll(".filter").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.cat === current); });
  }

  function renderGrid() {
    if (!grid) return;
    VIDEOS.sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
    grid.innerHTML = VIDEOS.map(cardHTML).join("");
    renderFilters(); applyFilter(); observeReveals(grid);
  }

  if (filtersEl) filtersEl.addEventListener("click", function (e) {
    var b = e.target.closest(".filter"); if (!b) return;
    current = b.dataset.cat; applyFilter();
  });
  if (grid) grid.addEventListener("click", function (e) {
    var card = e.target.closest(".card"); if (!card) return;
    openVideo(Number(card.dataset.id), card);
  });

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var lastFocus = null;
  function openVideo(id, from) {
    var v = VIDEOS.filter(function (x) { return x.id === id; })[0]; if (!v || !lb) return;
    lastFocus = from || document.activeElement;
    var ratio = (v.h && v.w) ? v.h / v.w : 9 / 16;
    var player = lb.querySelector(".player");
    // Fit inside the viewport for vertical and horizontal videos
    var maxH = window.innerHeight - 200;
    var width = Math.min(1200, window.innerWidth - 32, maxH / ratio);
    player.style.width = width + "px";
    player.style.aspectRatio = (v.w && v.h) ? (v.w + " / " + v.h) : "16 / 9";
    player.innerHTML = '<iframe src="https://player.vimeo.com/video/' + v.id + '?autoplay=1&title=0&byline=0&portrait=0&dnt=1&color=ffffff" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="' + esc(v.title) + '"></iframe>';
    lb.querySelector(".lightbox-meta").style.width = width + "px";
    lb.querySelector("[data-lb-title]").textContent = v.title;
    lb.querySelector("[data-lb-sub]").textContent = [loc(v, "client"), v.year].filter(Boolean).join(" · ") + (loc(v, "note") ? " · " + loc(v, "note") : "");
    lb.querySelector("[data-lb-link]").href = "https://vimeo.com/" + v.id;
    lb.querySelector("[data-lb-link]").textContent = T.watchOnVimeo;
    lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    lb.querySelector(".lightbox-close").focus();
  }
  function closeVideo() {
    if (!lb || !lb.classList.contains("open")) return;
    lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    setTimeout(function () { lb.querySelector(".player").innerHTML = ""; }, 350);
    if (lastFocus) lastFocus.focus();
  }
  if (lb) {
    lb.addEventListener("click", function (e) { if (e.target === lb || e.target.closest(".lightbox-close")) closeVideo(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeVideo();
      if (e.key === "Tab" && lb.classList.contains("open")) {
        var f = lb.querySelectorAll("button, a[href], iframe"); var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }
  document.querySelectorAll("[data-play]").forEach(function (b) {
    b.addEventListener("click", function () { openVideo(Number(b.dataset.play), b); });
  });

  /* ---------- Auto-add new Vimeo uploads ---------- */
  function guessCats(title) {
    var t = title.toLowerCase(), c = [];
    if (/vfx|cgi|comp|roto|breakdown/.test(t)) c.push("vfx");
    if (/3d|cgi|render/.test(t)) c.push("3d");
    if (/motion|gfx|logo|reveal|explainer|animation/.test(t)) c.push("motion");
    if (/edit|grade|color|colour|post/.test(t)) c.push("post");
    return c.length ? c : ["motion"];
  }
  function syncVimeo() {
    if (!window.fetch) return;
    var known = {}; VIDEOS.forEach(function (v) { known[v.id] = 1; });
    (window.PHOTON_VIDEOS || []).forEach(function (v) { known[v.id] = 1; }); // includes hidden ones
    // The public API returns 20 videos per page (max 3 pages); only ask for the next page when this one is full.
    function getPage(p, acc) {
      return fetch("https://vimeo.com/api/v2/" + USER + "/videos.json?page=" + p)
        .then(function (r) { return r.ok ? r.json() : []; })
        .catch(function () { return []; })
        .then(function (list) {
          acc = acc.concat(list || []);
          return (list && list.length === 20 && p < 3) ? getPage(p + 1, acc) : acc;
        });
    }
    getPage(1, []).then(function (all) {
      var added = [];
      all.forEach(function (x) {
        if (!x || known[x.id]) return;
        known[x.id] = 1;
        added.push({
          // Year in the title wins (e.g. "Zain 2021"); upload year is only a fallback
          id: x.id, title: x.title, client: "",
          year: Number((String(x.title).match(/\b(19|20)\d{2}\b/) || [String(x.upload_date).slice(0, 4)])[0]),
          cats: guessCats(x.title), w: x.width, h: x.height,
          thumbUrl: String(x.thumbnail_large || "").split("?")[0].replace("-d_640", "-d_960x540")
        });
      });
      if (!added.length) return;
      added.sort(function (a, b) { return b.id - a.id; });
      var featured = VIDEOS.filter(function (v) { return v.featured; });
      var rest = VIDEOS.filter(function (v) { return !v.featured; });
      VIDEOS = featured.concat(added, rest);
      renderGrid();
    });
  }

  /* ---------- Copy email ---------- */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.dataset.copy;
      var done = function () { btn.classList.add("copied"); setTimeout(function () { btn.classList.remove("copied"); }, 1800); };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done);
      else { var ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e) {} ta.remove(); done(); }
    });
  });

  /* ---------- Reveal on scroll ---------- */
  var revealer = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); revealer.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px" }) : null;
  function observeReveals(root) {
    (root || document).querySelectorAll(".reveal:not(.in)").forEach(function (el, i) {
      if (!revealer) { el.classList.add("in"); return; }
      el.style.transitionDelay = (root ? (i % 3) * 80 : 0) + "ms";
      revealer.observe(el);
    });
  }

  /* ---------- Year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  renderGrid();
  observeReveals();
  syncVimeo();
})();
