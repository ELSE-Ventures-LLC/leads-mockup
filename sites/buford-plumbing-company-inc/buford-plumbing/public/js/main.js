/* ============================================================
   BUFORD PLUMBING CO. — interaction layer
   scroll-driven pipe, pressure gauge, reveals, easter eggs
   ============================================================ */
(() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- page-load choreography ---------- */
  // wait for fonts so the entrance plays on settled layout (no mid-animation reflow)
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  const windowLoaded = new Promise((r) => window.addEventListener("load", r, { once: true }));
  Promise.all([fontsReady, windowLoaded]).then(() => document.body.classList.add("loaded"));
  // fallback if either stalls
  setTimeout(() => document.body.classList.add("loaded"), 2500);

  /* ---------- header / scroll state ---------- */
  const head = $(".site-head");
  const pipeRail = $(".pipe-rail");
  const gauge = $("#gauge");
  const gaugeNeedle = $("#gaugeNeedle");
  const gaugeValue = $("#gaugeValue");
  const badge = $(".hero__badge-wrap");

  let joints = [];

  // expose real header height so the mobile hero can fill the rest of the viewport
  const measureHead = () =>
    document.documentElement.style.setProperty("--head-h", `${head.offsetHeight}px`);
  measureHead();

  const buildJoints = () => {
    const holder = $(".pipe-rail__joints");
    if (!holder) return;
    holder.innerHTML = "";
    joints = $$("main section[id]").map((sec) => {
      const j = document.createElement("div");
      j.className = "pipe-joint";
      j.style.top = `${sec.offsetTop + 8}px`;
      holder.appendChild(j);
      return { el: j, top: sec.offsetTop + 8 };
    });
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const docH = document.documentElement.scrollHeight;
      const max = docH - window.innerHeight;
      const p = max > 0 ? Math.min(y / max, 1) : 0;

      head.classList.toggle("scrolled", y > 60);

      if (pipeRail) {
        pipeRail.style.setProperty("--scroll", p.toFixed(4));
        pipeRail.style.setProperty("--scrolly", y.toFixed(0));
        const waterBottom = p * docH;
        for (const j of joints) j.el.classList.toggle("lit", waterBottom >= j.top);
      }

      // gauge: -120deg (0 PSI) → 120deg (100 PSI)
      const psi = Math.round(p * 100);
      gaugeNeedle.style.transform = `rotate(${-120 + p * 240}deg)`;
      gaugeValue.textContent = psi;
      gauge.classList.toggle("maxed", psi >= 99 && !reducedMotion);

      // hero badge gentle parallax rise
      if (badge && y < window.innerHeight) {
        badge.style.setProperty("--py", (y * 0.08).toFixed(1));
      }

      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  let resizeT;
  window.addEventListener("resize", () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => { buildJoints(); onScroll(); }, 200);
  });
  window.addEventListener("load", () => { measureHead(); buildJoints(); onScroll(); });

  /* ---------- hide the call bar while the hero is on screen ---------- */
  const heroEl = $(".hero");
  if (heroEl) {
    new IntersectionObserver(
      ([en]) => document.body.classList.toggle("past-hero", !en.isIntersecting),
      { threshold: 0.25 }
    ).observe(heroEl);
  }

  /* ---------- and while the footer water (duck habitat) is on screen ---------- */
  const waterEl = $(".footer__water");
  if (waterEl) {
    new IntersectionObserver(
      ([en]) => document.body.classList.toggle("at-footer", en.isIntersecting)
    ).observe(waterEl);
  }

  /* ---------- hero schematic mouse parallax ---------- */
  const hero = $(".hero");
  if (hero && matchMedia("(hover: hover)").matches && !reducedMotion) {
    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      hero.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    });
  }

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (en.isIntersecting) {
          en.target.classList.add("in-view");
          io.unobserve(en.target);
        }
      }
    },
    { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
  );
  $$(".reveal, .svc-card, .area__map, .ticket").forEach((el) => io.observe(el));

  /* ---------- animated counters ---------- */
  const counterIO = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        counterIO.unobserve(en.target);
        const target = +en.target.dataset.count;
        const t0 = performance.now();
        const dur = 1400;
        const tick = (t) => {
          const k = Math.min((t - t0) / dur, 1);
          en.target.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
          if (k < 1) requestAnimationFrame(tick);
        };
        reducedMotion ? (en.target.textContent = target) : requestAnimationFrame(tick);
      }
    },
    { threshold: 0.6 }
  );
  $$(".count").forEach((el) => counterIO.observe(el));

  /* ---------- mobile menu ---------- */
  const burger = $("#burger");
  const menu = $("#mobileMenu");
  const setMenu = (open) => {
    burger.classList.toggle("open", open);
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
    menu.setAttribute("aria-hidden", !open);
    document.body.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));

  /* ---------- web audio (lazy, gesture-gated) ---------- */
  let actx = null;
  const audio = () => (actx ||= new (window.AudioContext || window.webkitAudioContext)());

  const squeak = () => {
    try {
      const ctx = audio();
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(820, t);
      osc.frequency.exponentialRampToValueAtTime(1480, t + 0.07);
      osc.frequency.exponentialRampToValueAtTime(620, t + 0.22);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.22, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.26);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.3);
    } catch { /* audio blocked — duck squeaks in spirit */ }
  };

  const hiss = () => {
    try {
      const ctx = audio();
      const t = ctx.currentTime;
      const dur = 0.9;
      const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 2400;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      src.connect(filter).connect(gain).connect(ctx.destination);
      src.start(t);
    } catch { /* silence is acceptable pressure relief */ }
  };

  /* ---------- gauge: pressure release → back to top ---------- */
  gauge.addEventListener("click", () => {
    gauge.classList.add("venting");
    hiss();
    setTimeout(() => gauge.classList.remove("venting"), 2800);
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });

  /* ---------- duck: squeak, then the flotilla ---------- */
  const duck = $("#duck");
  let squeaks = 0;
  duck.addEventListener("click", () => {
    squeak();
    duck.classList.remove("squeaked");
    void duck.offsetWidth; // restart wiggle
    duck.classList.add("squeaked");
    if (++squeaks % 5 === 0) flotilla();
  });

  const DUCK_SVG = duck.innerHTML;
  const flotilla = () => {
    if (reducedMotion) return;
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const d = document.createElement("div");
        d.className = "duckling";
        d.innerHTML = `<svg viewBox="0 0 60 52">${DUCK_SVG.replace(/<\/?svg[^>]*>/g, "")}</svg>`;
        d.style.animationDelay = `0s, ${(i * 0.13).toFixed(2)}s`;
        d.style.bottom = `${14 + (i % 3) * 9}px`;
        document.body.appendChild(d);
        setTimeout(() => d.remove(), 7400);
      }, i * 420);
    }
  };

  /* ---------- type "leak" → it rains, we fix it ---------- */
  let typed = "";
  document.addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea")) return;
    typed = (typed + e.key.toLowerCase()).slice(-8);
    if (typed.endsWith("leak")) {
      typed = "";
      rain();
      console.log(
        "%cYou found a leak. We fix those. → (601) 372-7676",
        "font-family:monospace;background:#142420;color:#d9905a;padding:6px 12px;border-radius:3px;"
      );
    }
  });

  const rain = () => {
    if (reducedMotion) return;
    const n = 26;
    for (let i = 0; i < n; i++) {
      setTimeout(() => {
        const drop = document.createElement("div");
        drop.className = "leak-drop";
        drop.style.left = `${Math.random() * 98}vw`;
        drop.style.setProperty("--fall-t", `${(1.1 + Math.random() * 0.9).toFixed(2)}s`);
        document.body.appendChild(drop);
        setTimeout(() => drop.remove(), 2300);
      }, i * 90);
    }
  };

  /* ---------- footer year ---------- */
  $("#year").textContent = new Date().getFullYear();
})();
