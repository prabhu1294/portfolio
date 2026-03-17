// AI-themed particle background behind hero – lightweight, requestAnimationFrame
(function heroParticles() {
  var canvas = document.getElementById("hero-particles");
  var wrap = document.querySelector(".hero-bg-canvas-wrap");
  if (!canvas || !wrap) return;

  var ctx = canvas.getContext("2d");
  var particles = [];
  var w = 0;
  var h = 0;
  var CONNECT_DIST = 140;
  var PARTICLE_OPACITY = 0.14;
  var LINE_OPACITY = 0.06;
  var rafId = null;

  function count() {
    var width = wrap.offsetWidth || window.innerWidth;
    return window.innerWidth < 768 ? 22 : (window.innerWidth < 1200 ? 38 : 52);
  }

  function resize() {
    w = wrap.offsetWidth;
    h = wrap.offsetHeight;
    if (w <= 0 || h <= 0) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    initParticles();
  }

  function initParticles() {
    var n = count();
    particles = [];
    for (var i = 0; i < n; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random(),
        color: Math.random() > 0.5 ? "cyan" : "violet",
      });
    }
  }

  function draw() {
    if (w <= 0 || h <= 0) {
      rafId = requestAnimationFrame(draw);
      return;
    }
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(dpr, dpr);

    var i, j, dx, dy, dist;
    for (i = 0; i < particles.length; i++) {
      var a = particles[i];
      a.x += a.vx;
      a.y += a.vy;
      if (a.x < 0 || a.x > w) a.vx *= -1;
      if (a.y < 0 || a.y > h) a.vy *= -1;
      a.x = Math.max(0, Math.min(w, a.x));
      a.y = Math.max(0, Math.min(h, a.y));
    }

    ctx.lineWidth = 1;
    var maxLinks = 2;
    for (i = 0; i < particles.length; i++) {
      var nearest = [];
      for (j = i + 1; j < particles.length; j++) {
        dx = particles[j].x - particles[i].x;
        dy = particles[j].y - particles[i].y;
        dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) nearest.push({ j: j, d: dist });
      }
      nearest.sort(function (a, b) {
        return a.d - b.d;
      });
      for (j = 0; j < maxLinks && j < nearest.length; j++) {
        var other = particles[nearest[j].j];
        var d = nearest[j].d;
        var alpha = (1 - d / CONNECT_DIST) * LINE_OPACITY;
        ctx.strokeStyle = "rgba(34, 211, 238, " + alpha + ")";
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    }

    for (i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle =
        p.color === "cyan"
          ? "rgba(34, 211, 238, " + PARTICLE_OPACITY + ")"
          : "rgba(167, 139, 250, " + PARTICLE_OPACITY + ")";
      ctx.fill();
    }

    rafId = requestAnimationFrame(draw);
  }

  function start() {
    resize();
    draw();
  }

  window.addEventListener("resize", resize);
  window.addEventListener("load", resize);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();

// Coding lines (IDE-style) emitted around profile picture border
function initLiveBg() {
  var wrap = document.querySelector(".profile-section-wrap");
  var canvas = document.getElementById("live-bg-profile");
  if (!wrap || !canvas) return;

  var ctx = canvas.getContext("2d");
  var width = 0;
  var height = 0;
  var dpr = 1;
  var PHOTO_PAD = 0.063;
  var PHOTO_HEIGHT_PX = 250;

  var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
    /iPhone|iPad|iPod|Mac OS X.*Safari/i.test(navigator.userAgent) ||
    (navigator.vendor && navigator.vendor.indexOf("Apple") > -1);

  var COL_LIGHT = {
    keyword: "rgba(124, 58, 237, 0.95)",
    string: "rgba(22, 163, 74, 0.95)",
    comment: "rgba(100, 116, 139, 0.9)",
    number: "rgba(194, 65, 12, 0.95)",
    name: "rgba(8, 145, 178, 0.95)",
    fnCall: "rgba(8, 145, 178, 0.95)",
    plain: "rgba(30, 41, 59, 0.9)",
    operator: "rgba(51, 65, 85, 0.9)",
  };
  var COL_DARK = {
    keyword: "rgba(196, 181, 255, 0.95)",
    string: "rgba(134, 239, 172, 0.95)",
    comment: "rgba(161, 161, 170, 0.8)",
    number: "rgba(253, 186, 116, 0.95)",
    name: "rgba(103, 232, 249, 0.95)",
    fnCall: "rgba(34, 211, 238, 0.95)",
    plain: "rgba(250, 250, 250, 0.7)",
    operator: "rgba(250, 250, 250, 0.6)",
  };
  function getCol() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? COL_DARK : COL_LIGHT;
  }
  var COL = getCol();

  window.addEventListener("themechange", function () {
    COL = getCol();
    initParticles();
  });

  // Full code lines as segments: { type, text }
  var CODE_LINES = [
    [{ type: "keyword", text: "const" }, { type: "plain", text: " " }, { type: "name", text: "res" }, { type: "plain", text: " = " }, { type: "keyword", text: "await" }, { type: "plain", text: " " }, { type: "fnCall", text: "fetch" }, { type: "plain", text: "(" }, { type: "string", text: "\"/api\"" }, { type: "plain", text: ");" }],
    [{ type: "keyword", text: "function" }, { type: "plain", text: " " }, { type: "name", text: "run" }, { type: "plain", text: "() {" }, { type: "keyword", text: "return" }, { type: "plain", text: " " }, { type: "fnCall", text: "model" }, { type: "plain", text: ".stream();" }],
    [{ type: "comment", text: "// " }, { type: "comment", text: "AI agent pipeline" }],
    [{ type: "keyword", text: "async" }, { type: "plain", text: " " }, { type: "keyword", text: "function" }, { type: "plain", text: " " }, { type: "name", text: "main" }, { type: "plain", text: "() {" }, { type: "number", text: "42" }, { type: "plain", text: "; }" }],
    [{ type: "name", text: "useEffect" }, { type: "plain", text: "(() => {" }, { type: "fnCall", text: "init" }, { type: "plain", text: "(); }, []);" }],
    [{ type: "keyword", text: "try" }, { type: "plain", text: " { " }, { type: "fnCall", text: "await" }, { type: "plain", text: " " }, { type: "fnCall", text: "run" }, { type: "plain", text: "(); } " }, { type: "keyword", text: "catch" }, { type: "plain", text: " (e) {}" }],
    [{ type: "keyword", text: "export" }, { type: "plain", text: " " }, { type: "keyword", text: "const" }, { type: "plain", text: " " }, { type: "name", text: "API" }, { type: "plain", text: " = " }, { type: "string", text: "\"v1\"" }, { type: "plain", text: ";" }],
    [{ type: "comment", text: "// TODO: refactor" }],
    [{ type: "name", text: "prompt" }, { type: "plain", text: ": " }, { type: "string", text: "\"build\"" }, { type: "plain", text: "," }, { type: "name", text: "stream" }, { type: "plain", text: ": true };" }],
    [{ type: "keyword", text: "class" }, { type: "plain", text: " " }, { type: "name", text: "Agent" }, { type: "plain", text: " { " }, { type: "fnCall", text: "run" }, { type: "plain", text: "() {} }" }],
    [{ type: "keyword", text: "return" }, { type: "plain", text: " " }, { type: "fnCall", text: "response" }, { type: "plain", text: ".json();" }],
    [{ type: "number", text: "200" }, { type: "plain", text: ", " }, { type: "string", text: "\"ok\"" }, { type: "plain", text: ");" }],
    [{ type: "comment", text: "// vibe coding" }],
    [{ type: "keyword", text: "const" }, { type: "plain", text: " " }, { type: "name", text: "x" }, { type: "plain", text: " = " }, { type: "number", text: "0" }, { type: "plain", text: "; " }, { type: "keyword", text: "let" }, { type: "plain", text: " y = 1;" }],
    [{ type: "fnCall", text: "console" }, { type: "plain", text: ".log(" }, { type: "string", text: "'done'" }, { type: "plain", text: ");" }],
  ];

  var FONT_SIZE = 9;
  var LINE_HEIGHT = 16;

  var particles = [];

  function getPhotoRect() {
    var pad = width * PHOTO_PAD;
    var photoH = Math.min(PHOTO_HEIGHT_PX, height - pad * 2);
    return {
      left: pad,
      top: pad,
      right: width - pad,
      bottom: pad + photoH,
      width: width - pad * 2,
      height: photoH,
    };
  }

  function spawnOnBorder() {
    var r = getPhotoRect();
    var edge = Math.floor(Math.random() * 4);
    var x, y, vx, vy;
    var out = 1.2 + Math.random() * 0.6;
    if (edge === 0) {
      x = r.left + Math.random() * r.width;
      y = r.top;
      vx = (Math.random() - 0.5) * 1.2;
      vy = out;
    } else if (edge === 1) {
      x = r.right;
      y = r.top + Math.random() * r.height;
      vx = out;
      vy = (Math.random() - 0.5) * 0.6;
    } else if (edge === 2) {
      x = r.left + Math.random() * r.width;
      y = r.bottom;
      vx = (Math.random() - 0.5) * 1.2;
      vy = out;
    } else {
      x = r.left;
      y = r.top + Math.random() * r.height;
      vx = -out;
      vy = (Math.random() - 0.5) * 0.6;
    }
    return { x: x, y: y, vx: vx, vy: vy };
  }

  function resize() {
    width = wrap.offsetWidth || 280;
    height = wrap.offsetHeight || 320;
    if (isSafari) {
      dpr = 1;
      canvas.width = Math.floor(width);
      canvas.height = Math.floor(height);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      canvas.style.transform = "";
      canvas.style.transformOrigin = "";
    } else {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = Math.floor(width * dpr);
      var h = Math.floor(height * dpr);
      canvas.width = w;
      canvas.height = h;
      if (dpr > 1) {
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        canvas.style.transform = "scale(" + 1 / dpr + ")";
        canvas.style.transformOrigin = "0 0";
      } else {
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.style.transform = "";
        canvas.style.transformOrigin = "";
      }
    }
    initParticles();
  }

  function pickCodeLine() {
    return CODE_LINES[Math.floor(Math.random() * CODE_LINES.length)].map(function (seg) {
      return { type: seg.type, text: seg.text };
    });
  }

  function initParticles() {
    particles = [];
    var count = width > 50 && height > 50 ? 24 : 0;
    for (var i = 0; i < count; i++) {
      var s = spawnOnBorder();
      particles.push({
        x: s.x,
        y: s.y,
        segments: pickCodeLine(),
        vx: s.vx,
        vy: s.vy,
        alpha: 0.85 + Math.random() * 0.15,
      });
    }
  }

  function rgbaWithAlpha(rgbaStr, alphaMul) {
    var match = rgbaStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!match) return rgbaStr;
    var a = match[4] != null ? parseFloat(match[4]) * alphaMul : alphaMul;
    return "rgba(" + match[1] + "," + match[2] + "," + match[3] + "," + Math.round(a * 100) / 100 + ")";
  }

  function drawCodeLine(x, y, segments, alpha) {
    var cx = Math.round(x);
    var yInt = Math.round(y);
    for (var s = 0; s < segments.length; s++) {
      var seg = segments[s];
      ctx.fillStyle = rgbaWithAlpha(COL[seg.type] || COL.plain, alpha);
      ctx.fillText(seg.text, cx, yInt);
      cx += Math.round(ctx.measureText(seg.text).width);
    }
  }

  function draw() {
    if (width <= 0 || height <= 0) {
      requestAnimationFrame(draw);
      return;
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.textBaseline = "alphabetic";
    ctx.font = FONT_SIZE + 'px "SF Mono", Monaco, "Menlo", "Ubuntu Mono", Consolas, monospace';

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      var off = 50;
      if (p.y > height + off || p.y < -off || p.x < -80 || p.x > width + 80) {
        var s = spawnOnBorder();
        p.x = s.x;
        p.y = s.y;
        p.vx = s.vx;
        p.vy = s.vy;
        p.segments = pickCodeLine();
        p.alpha = 0.85 + Math.random() * 0.15;
      }
      drawCodeLine(p.x, p.y, p.segments, p.alpha);
    }

    ctx.restore();
    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize);
  window.addEventListener("load", function () {
    resize();
  });
  setTimeout(resize, 150);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLiveBg);
} else {
  initLiveBg();
}

// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      nav.classList.remove("open");
    });
  });
}

// Hide play overlay when video is playing
document.querySelectorAll(".video-showcase").forEach(function (showcase) {
  var video = showcase.querySelector(".video-player");
  if (!video) return;
  video.addEventListener("play", function () {
    showcase.classList.add("playing");
  });
  video.addEventListener("pause", function () {
    showcase.classList.remove("playing");
  });
  video.addEventListener("ended", function () {
    showcase.classList.remove("playing");
  });
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const headerOffset = 72;
    const rect = target.getBoundingClientRect();
    const offsetPosition = rect.top + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});

// Reveal on scroll (existing .reveal elements)
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}

// Apple-style scroll storytelling
(function scrollStory() {
  if (!("IntersectionObserver" in window)) return;

  var hero = document.getElementById("hero");
  var scrollSections = document.querySelectorAll("main > section.scroll-section");
  var aboutGrid = document.querySelector("#about .about-grid");
  var projectGrid = document.querySelector("#projects .project-grid");
  var parallaxLayer = document.querySelector(".parallax-layer");

  // Hero: fade + scale when user scrolls past
  if (hero) {
    var heroObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio < 0.85) {
            hero.classList.add("hero-scrolled");
          } else {
            hero.classList.remove("hero-scrolled");
          }
        });
      },
      { threshold: [0.5, 0.7, 0.85, 1] }
    );
    heroObserver.observe(hero);
  }

  // Sections: slide up when entering viewport
  var sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
          if (entry.target.id === "about" && aboutGrid) {
            aboutGrid.classList.add("parallax-visible");
          }
          if (entry.target.id === "projects" && projectGrid) {
            projectGrid.classList.add("stagger-visible");
          }
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  scrollSections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  // Parallax background motion
  if (parallaxLayer) {
    var ticking = false;
    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          var y = window.scrollY || window.pageYOffset;
          var rate = 0.08;
          parallaxLayer.style.transform = "translate3d(0, " + y * rate + "px, 0)";
          ticking = false;
        });
      },
      { passive: true }
    );
  }
})();

// Theme toggle (light / dark)
(function themeToggle() {
  var storageKey = "portfolio-theme";
  var html = document.documentElement;

  function getStored() {
    try {
      return localStorage.getItem(storageKey) || "light";
    } catch (e) {
      return "light";
    }
  }

  function setTheme(theme) {
    theme = theme === "dark" ? "dark" : "light";
    html.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(storageKey, theme);
    } catch (e) {}
    document.querySelectorAll(".theme-btn").forEach(function (btn) {
      var active = btn.getAttribute("data-theme") === theme;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active);
    });
    window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
  }

  document.querySelectorAll(".theme-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setTheme(btn.getAttribute("data-theme"));
    });
  });

  setTheme(getStored());
})();

// Dynamic year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

