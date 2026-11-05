/* Complete Lawn Service MS — interaction layer. Zero dependencies. */

const html = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

html.classList.add("js");

/* ------------------------------------------------------------
   Intro wipe — once per session, skipped for reduced motion
   ------------------------------------------------------------ */
(() => {
  const intro = document.getElementById("intro");
  const seen = sessionStorage.getItem("cls-intro") === "1";

  const finish = () => {
    html.classList.add("intro-done");
    html.classList.remove("intro-arming", "intro-leaving");
    intro?.remove();
  };

  if (!intro || seen || reduceMotion) {
    finish();
    return;
  }

  const word = document.getElementById("introWord");
  if (word) {
    const text = word.textContent;
    word.textContent = "";
    [...text].forEach((ch, i) => {
      const s = document.createElement("span");
      s.className = "ltr";
      s.style.setProperty("--li", i);
      s.textContent = ch === " " ? " " : ch;
      word.appendChild(s);
    });
  }

  html.classList.add("intro-arming");
  sessionStorage.setItem("cls-intro", "1");

  setTimeout(() => {
    html.classList.add("intro-leaving");
    html.classList.add("intro-done");
    setTimeout(finish, 720);
  }, 1280);
})();

/* ------------------------------------------------------------
   Header — solid after scroll, tucks away going down
   ------------------------------------------------------------ */
(() => {
  const header = document.getElementById("header");
  const burger = document.getElementById("burger");
  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    header.classList.toggle("is-solid", y > 24);
    const menuOpen = burger.classList.contains("is-open");
    if (!menuOpen) {
      const goingDown = y > lastY && y > 260;
      header.classList.toggle("is-tucked", goingDown);
    }
    lastY = y;
    ticking = false;
  };

  addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  update();
})();

/* ------------------------------------------------------------
   Mobile menu
   ------------------------------------------------------------ */
(() => {
  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobileMenu");
  if (!burger || !menu) return;

  menu.querySelectorAll(".menu__link").forEach((a, i) => a.style.setProperty("--mi", i));

  const setOpen = (open) => {
    burger.classList.toggle("is-open", open);
    menu.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
    const header = document.getElementById("header");
    header.classList.toggle("menu-open", open);
    if (open) header.classList.remove("is-tucked");
  };

  burger.addEventListener("click", () => setOpen(!burger.classList.contains("is-open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  addEventListener("keydown", (e) => {
    if (e.key === "Escape" && burger.classList.contains("is-open")) setOpen(false);
  });
})();

/* ------------------------------------------------------------
   Kinetic hero type — letters gain weight near the cursor
   ------------------------------------------------------------ */
(() => {
  const lines = document.querySelectorAll("[data-kinetic]");
  if (!lines.length) return;

  lines.forEach((line) => {
    const text = line.textContent;
    line.textContent = "";
    [...text].forEach((ch) => {
      if (ch === " ") {
        line.appendChild(document.createTextNode(" "));
        return;
      }
      const s = document.createElement("span");
      s.className = "kchar";
      s.textContent = ch;
      line.appendChild(s);
    });
  });

  if (!finePointer || reduceMotion) return;

  const chars = [...document.querySelectorAll(".kchar")];
  const hero = document.querySelector(".hero");
  let mx = -1e4, my = -1e4;
  let raf = null;

  const paint = () => {
    raf = null;
    for (const c of chars) {
      const r = c.getBoundingClientRect();
      const dx = r.left + r.width / 2 - mx;
      const dy = r.top + r.height / 2 - my;
      const d = Math.hypot(dx, dy);
      const t = Math.max(0, 1 - d / 240);
      const w = 680 + t * 120; /* 680 relaxed → 800 under the cursor */
      c.style.setProperty("--kw", w.toFixed(0));
    }
  };

  hero.addEventListener("pointermove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    if (!raf) raf = requestAnimationFrame(paint);
  });
  hero.addEventListener("pointerleave", () => {
    mx = -1e4;
    my = -1e4;
    if (!raf) raf = requestAnimationFrame(paint);
  });
})();

/* ------------------------------------------------------------
   Scroll reveals
   ------------------------------------------------------------ */
(() => {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.16, rootMargin: "0px 0px -7% 0px" }
  );
  targets.forEach((t) => io.observe(t));
})();

/* ------------------------------------------------------------
   Ticker — clone the list so the loop never runs dry
   ------------------------------------------------------------ */
(() => {
  const track = document.getElementById("tickerTrack");
  if (!track) return;
  const list = track.firstElementChild;
  for (let i = 0; i < 2; i++) track.appendChild(list.cloneNode(true));
})();

/* ------------------------------------------------------------
   Stat counters
   ------------------------------------------------------------ */
(() => {
  const nums = document.querySelectorAll("[data-count]");
  if (!nums.length) return;

  const run = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const from = el.dataset.from ? parseInt(el.dataset.from, 10) : target === 0 ? 12 : 0;
    const dur = 1500;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(from + (target - from) * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (reduceMotion || !("IntersectionObserver" in window)) {
    nums.forEach((el) => (el.textContent = el.dataset.count));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          run(e.target);
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.6 }
  );
  nums.forEach((el) => io.observe(el));
})();

/* ------------------------------------------------------------
   Before / after slider
   ------------------------------------------------------------ */
(() => {
  const ba = document.getElementById("ba");
  const range = document.getElementById("baRange");
  if (!ba || !range) return;

  let userTouched = false;
  const set = (v) => ba.style.setProperty("--pos", `${v}%`);

  range.addEventListener("input", () => {
    userTouched = true;
    set(range.value);
  });
  range.addEventListener("pointerdown", () => {
    userTouched = true;
    ba.classList.add("is-grabbed");
  });
  addEventListener("pointerup", () => ba.classList.remove("is-grabbed"));

  /* a one-time nudge teaches the drag */
  if (!reduceMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1700;
        const swing = (t) => {
          if (userTouched) return;
          const p = Math.min(1, (t - t0) / dur);
          const v = 50 + Math.sin(p * Math.PI) * 14;
          range.value = v;
          set(v);
          if (p < 1) requestAnimationFrame(swing);
        };
        setTimeout(() => requestAnimationFrame(swing), 350);
      },
      { threshold: 0.5 }
    );
    io.observe(ba);
  }
})();

/* ------------------------------------------------------------
   Process — sticky display follows the active step,
   measuring tape fills with section progress
   ------------------------------------------------------------ */
(() => {
  const steps = [...document.querySelectorAll(".step")];
  const num = document.getElementById("processNum");
  const word = document.getElementById("processWord");
  const display = num?.closest(".process__display");
  const fill = document.getElementById("tapeFill");
  const section = document.getElementById("process");
  if (!steps.length || !section) return;

  let current = "01";
  const swap = (step) => {
    if (!display || step.dataset.num === current) return;
    current = step.dataset.num;
    if (reduceMotion) {
      num.textContent = step.dataset.num;
      word.textContent = step.dataset.word;
      return;
    }
    display.classList.add("is-swapping");
    setTimeout(() => {
      num.textContent = step.dataset.num;
      word.textContent = step.dataset.word;
      display.classList.remove("is-swapping");
    }, 240);
  };

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            steps.forEach((s) => s.classList.toggle("is-active", s === e.target));
            swap(e.target);
          }
        }
      },
      { rootMargin: "-42% 0px -42% 0px" }
    );
    steps.forEach((s) => io.observe(s));
  } else {
    steps.forEach((s) => s.classList.add("is-active"));
  }

  if (fill) {
    let ticking = false;
    const update = () => {
      const r = section.getBoundingClientRect();
      const mid = innerHeight * 0.55;
      const p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
      fill.style.setProperty("--p", p.toFixed(3));
      ticking = false;
    };
    addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    update();
  }
})();

/* ------------------------------------------------------------
   Service-area list ↔ map sync
   ------------------------------------------------------------ */
(() => {
  if (!finePointer) return;
  document.querySelectorAll(".areas__list li").forEach((li) => {
    const city = document.querySelector(`.map__city[data-city="${li.dataset.city}"]`);
    if (!city) return;
    li.addEventListener("mouseenter", () => city.classList.add("is-hot"));
    li.addEventListener("mouseleave", () => city.classList.remove("is-hot"));
  });
})();

/* ------------------------------------------------------------
   Magnetic buttons
   ------------------------------------------------------------ */
(() => {
  if (!finePointer || reduceMotion) return;
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * 0.16}px, ${dy * 0.22}px)`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.transition = "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.transform = "";
      setTimeout(() => (el.style.transition = ""), 560);
    });
  });
})();

/* ------------------------------------------------------------
   Quote form — demo handler with a rubber stamp
   ------------------------------------------------------------ */
(() => {
  const form = document.getElementById("qform");
  const done = document.getElementById("qformDone");
  if (!form || !done) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    done.hidden = false;
    form.querySelectorAll("input, textarea, button").forEach((el) => (el.disabled = true));
    done.querySelector(".qform__stamp")?.focus?.();
  });
})();

/* ------------------------------------------------------------
   Mobile call bar — fades in with scroll (invisible at the top,
   fully shown by half a screen down), and steps aside when the
   quote form or footer is on screen.
   ------------------------------------------------------------ */
(() => {
  const bar = document.getElementById("callbar");
  if (!bar) return;
  let nearForm = false;
  let ticking = false;

  const apply = () => {
    ticking = false;
    const mark = innerHeight * 0.5; /* fully visible by half a viewport */
    let p = Math.min(1, Math.max(0, window.scrollY / mark));
    if (nearForm) p = 0;
    bar.style.setProperty("--cb", p.toFixed(3));
    bar.style.pointerEvents = p > 0.05 ? "auto" : "none";
  };

  addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    },
    { passive: true }
  );
  addEventListener("resize", apply, { passive: true });

  if ("IntersectionObserver" in window) {
    const visible = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target, e.isIntersecting));
        nearForm = [...visible.values()].some(Boolean);
        apply();
      },
      { threshold: 0.08 }
    );
    const quote = document.getElementById("quote");
    const footer = document.querySelector(".footer");
    quote && io.observe(quote);
    footer && io.observe(footer);
  }
  apply();
})();

/* ------------------------------------------------------------
   Service cards — on touch / narrow screens there is no hover, so
   the card nearest the viewport centre becomes "active" as you
   scroll (drawn circle + border + lift). Desktop keeps real hover.
   ------------------------------------------------------------ */
(() => {
  const cards = [...document.querySelectorAll(".services__grid .card")];
  if (!cards.length) return;
  const mq = matchMedia("(max-width: 880px)");
  let active = null;
  let ticking = false;

  const clear = () => {
    if (active) active.classList.remove("is-active");
    active = null;
  };

  const pick = () => {
    ticking = false;
    if (!mq.matches) return clear();
    const mid = innerHeight / 2;
    let best = null;
    let bestD = Infinity;
    for (const c of cards) {
      const r = c.getBoundingClientRect();
      if (r.bottom < 72 || r.top > innerHeight - 72) continue;
      const d = Math.abs(r.top + r.height / 2 - mid);
      if (d < bestD) {
        bestD = d;
        best = c;
      }
    }
    if (best !== active) {
      if (active) active.classList.remove("is-active");
      if (best) best.classList.add("is-active");
      active = best;
    }
  };

  addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(pick);
      }
    },
    { passive: true }
  );
  addEventListener("resize", pick, { passive: true });
  mq.addEventListener?.("change", pick);
  pick();
})();

/* ------------------------------------------------------------
   Easter egg — the mower run. Click the parked mower in the
   footer, or just type "mow" anywhere on the page.
   ------------------------------------------------------------ */
(() => {
  const run = document.getElementById("mowerRun");
  const btn = document.getElementById("mowerBtn");
  if (!run) return;
  let going = false;

  const mow = () => {
    if (going || reduceMotion) return;
    going = true;
    run.classList.add("is-going");
    setTimeout(() => run.classList.add("is-fading"), 4700);
    setTimeout(() => {
      run.classList.remove("is-going", "is-fading");
      going = false;
    }, 6600);
  };

  btn?.addEventListener("click", mow);

  let buffer = "";
  addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea, select")) return;
    buffer = (buffer + e.key.toLowerCase()).slice(-3);
    if (buffer === "mow") mow();
  });
})();

/* ------------------------------------------------------------
   For the curious
   ------------------------------------------------------------ */
console.log(
  "%c🌱 COMPLETE LAWN SERVICE MS %c\n\nHand-built. No templates, no page builders —\njust HTML, CSS and a little JavaScript, the way\nwe mow: straight lines, no shortcuts.\n\nPsst: type  m o w  anywhere on the page.",
  "font-family: monospace; font-size: 16px; font-weight: bold; background: #15211a; color: #f4efe1; padding: 6px 10px;",
  "font-family: monospace; font-size: 12px; color: #5e6f4f;"
);
