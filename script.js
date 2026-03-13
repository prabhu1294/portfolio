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

  // IDE-style colors (bright, VS Code–like)
  var COL = {
    keyword: "rgba(166, 38, 164, 1)",
    string: "rgba(0, 128, 80, 1)",
    comment: "rgba(108, 117, 125, 1)",
    number: "rgba(181, 86, 20, 1)",
    name: "rgba(0, 112, 193, 1)",
    fnCall: "rgba(0, 145, 178, 1)",
    plain: "rgba(36, 41, 47, 1)",
    operator: "rgba(36, 41, 47, 1)",
  };

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

// Reveal on scroll
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  // Fallback for older browsers
  revealElements.forEach((el) => el.classList.add("visible"));
}

// Dynamic year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

