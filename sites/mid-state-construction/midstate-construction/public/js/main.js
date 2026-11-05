/* ============================================================
   MID-STATE CONSTRUCTION — interaction engine
   Zero dependencies. One rAF loop. Every frame accounted for.
   ============================================================ */
(() => {
  'use strict';

  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(pointer: fine)').matches;
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const lerp = (a, b, t) => a + (b - a) * t;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  const today = (() => {
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    return `${p(d.getMonth() + 1)}.${p(d.getDate())}.${d.getFullYear()}`;
  })();

  /* ---------- toast ---------- */
  const toastEl = $('#toast');
  let toastT;
  const toast = (msg, ms = 2600) => {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove('show'), ms);
  };

  /* ============================================================
     SVG DRAW-IN — measure every stroke, draw in build order
     ============================================================ */
  const drawSVG = (svg) => {
    if (RM || svg.dataset.drawn) return;
    svg.dataset.drawn = '1';
    const els = $$('path, line, circle', svg);
    const texts = $$('text', svg);
    let i = 0;
    els.forEach((el) => {
      const order = +(el.dataset.o || 0);
      const delay = order * 110 + i * 9;
      i++;
      if (el.classList.contains('f')) {
        el.style.fillOpacity = '0';
        el.animate([{ fillOpacity: 0 }, { fillOpacity: 1 }], {
          duration: 500, delay: delay + 350, easing: 'ease-out', fill: 'forwards',
        }).onfinish = () => { el.style.fillOpacity = ''; };
        return;
      }
      let len = 0;
      try { len = el.getTotalLength ? el.getTotalLength() : 0; } catch { len = 0; }
      if (!len) return;
      const dashed = el.classList.contains('ln-hid');
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
      const glz = el.classList.contains('glz');
      if (glz) el.style.fillOpacity = '0';
      const anim = el.animate(
        [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
        { duration: clamp(len * 4, 300, 900), delay, easing: 'cubic-bezier(.5,0,.2,1)', fill: 'forwards' }
      );
      anim.onfinish = () => {
        // restore stylesheet dashes / fills (hidden-line convention)
        if (dashed) { el.style.strokeDasharray = ''; el.style.strokeDashoffset = ''; }
        if (glz) {
          el.animate([{ fillOpacity: 0 }, { fillOpacity: 1 }], { duration: 380, fill: 'forwards' })
            .onfinish = () => { el.style.fillOpacity = ''; };
        }
      };
    });
    texts.forEach((t, j) => {
      t.style.fillOpacity = '0';
      t.animate([{ fillOpacity: 0 }, { fillOpacity: 1 }], {
        duration: 420, delay: 900 + j * 120, easing: 'ease-out', fill: 'forwards',
      }).onfinish = () => { t.style.fillOpacity = ''; };
    });
  };

  /* ============================================================
     COVER-SHEET WORDMARK — fit each line flush to the column
     ============================================================ */
  const heroTitle = $('#heroTitle');
  const fitTitle = () => {
    const box = heroTitle.clientWidth;
    const lines = $$('.line', heroTitle);
    // width-fit each line, then scale both by a common factor so the
    // stack stays flush even when the viewport height caps it
    const caps = [innerHeight * 0.27, innerHeight * 0.21];
    const sizes = lines.map((line) => {
      const word = $('.word', line);
      line.style.fontSize = '100px';
      const w = word.getBoundingClientRect().width;
      return w > 0 ? ((box - 4) / w) * 100 : 100; // -4px guards subpixel overflow
    });
    const k = Math.min(1, ...sizes.map((s, i) => (caps[i] || s) / s));
    lines.forEach((line, i) => {
      line.style.fontSize = `${clamp(sizes[i] * k, 30, 300).toFixed(2)}px`;
    });
    heroTitle.classList.add('fit');
  };
  let fitT;
  const refit = () => { clearTimeout(fitT); fitT = setTimeout(fitTitle, 120); };
  addEventListener('resize', refit, { passive: true });
  fitTitle();

  /* ============================================================
     PRELOADER → INTRO
     ============================================================ */
  const loader = $('#loader');
  const heroStamp = $('#heroStamp');
  const dimline = $('.dimline');

  const intro = () => {
    heroTitle.classList.add('go');
    dimline.classList.add('go');
    heroStamp.classList.add('go');
    setTimeout(() => drawSVG($('#heroArt .iso')), 500);
  };

  if (RM) {
    loader.remove();
    intro();
  } else {
    document.body.classList.add('no-scroll');
    const pct = $('#loaderPct');
    const fill = $('#loaderFill');
    const msg = $('#loaderMsg');
    const msgs = ['MOBILIZING SITE…', 'SETTING GRADE STAKES…', 'CHECKING LEVEL…', 'PLUMB & SQUARE.'];
    const t0 = performance.now();
    const DUR = 1350;
    let raf;
    const tick = (t) => {
      const p = clamp((t - t0) / DUR, 0, 1);
      const e = 1 - Math.pow(1 - p, 3); // easeOutCubic
      pct.textContent = `${Math.round(e * 100)}%`;
      fill.style.transform = `scaleX(${e})`;
      msg.textContent = msgs[Math.min(msgs.length - 1, Math.floor(p * msgs.length))];
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        loader.classList.add('done');
        document.body.classList.remove('no-scroll');
        setTimeout(intro, 240);
        setTimeout(() => loader.remove(), 1000);
      }
    };
    raf = requestAnimationFrame(tick);
  }

  /* ============================================================
     REVEALS — staggered per batch
     ============================================================ */
  const revealIO = new IntersectionObserver((entries) => {
    const batch = entries.filter((e) => e.isIntersecting);
    batch.forEach((e, i) => {
      e.target.style.setProperty('--rd', `${i * 0.09}s`);
      e.target.classList.add('in');
      revealIO.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach((el) => revealIO.observe(el));

  /* draw card/map art when visible */
  const artIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const svg = $('svg', e.target);
      if (svg) drawSVG(svg);
      if (e.target.classList.contains('about-map')) e.target.classList.add('in');
      artIO.unobserve(e.target);
    });
  }, { threshold: 0.25 });
  $$('.wcard-art, .about-map').forEach((el) => artIO.observe(el));

  /* ============================================================
     COUNTERS
     ============================================================ */
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      countIO.unobserve(e.target);
      const el = e.target;
      const to = +el.dataset.to;
      const from = +(el.dataset.from || 0);
      if (RM) { el.textContent = to; return; }
      const t0 = performance.now();
      const DUR = 1700;
      const step = (t) => {
        const p = clamp((t - t0) / DUR, 0, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(lerp(from, to, ease));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.6 });
  $$('.count').forEach((el) => countIO.observe(el));

  /* ============================================================
     MARQUEE — duplicate segment for seamless loop
     ============================================================ */
  const mTrack = $('#marqueeTrack');
  if (mTrack) {
    const seg = mTrack.firstElementChild;
    for (let i = 0; i < 5; i++) {
      const c = seg.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      mTrack.appendChild(c);
    }
  }

  /* ============================================================
     HEADER, MOBILE NAV, SCROLLSPY
     ============================================================ */
  const hdr = $('#hdr');
  const menuBtn = $('#menuBtn');
  const mob = $('#mobNav');
  menuBtn.addEventListener('click', () => {
    const open = menuBtn.getAttribute('aria-expanded') !== 'true';
    menuBtn.setAttribute('aria-expanded', open);
    mob.classList.toggle('open', open);
    mob.setAttribute('aria-hidden', !open);
    document.body.classList.toggle('no-scroll', open);
    document.body.classList.toggle('menu-open', open);
  });
  $$('.mob-nav a').forEach((a) => a.addEventListener('click', () => menuBtn.click()));
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mob.classList.contains('open')) menuBtn.click();
  });

  const spyIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const id = e.target.id;
      $$('.nav a').forEach((a) => a.classList.toggle('act', a.getAttribute('href') === `#${id}`));
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  $$('section[id]').forEach((s) => spyIO.observe(s));

  /* ============================================================
     SERVICES ACCORDION
     ============================================================ */
  $$('.svc-row').forEach((row) => {
    const btn = $('.svc-btn', row);
    btn.addEventListener('click', () => {
      const open = row.dataset.open !== 'true';
      // close siblings — one open sheet at a time, like a real spec book
      $$('.svc-row[data-open="true"]').forEach((r) => {
        if (r !== row) { r.dataset.open = 'false'; $('.svc-btn', r).setAttribute('aria-expanded', 'false'); }
      });
      row.dataset.open = open;
      btn.setAttribute('aria-expanded', open);
    });
  });

  /* ============================================================
     ONE rAF LOOP — tape, header, pinned work, process, quote
     ============================================================ */
  const tapeFill = $('#tapeFill');
  const workSec = $('#work');
  const workPin = $('#workPin');
  const workTrack = $('#workTrack');
  const workIdx = $('#workIdx');
  const workRule = $('#workRule');
  const procSteps = $('#procSteps');

  const COARSE = matchMedia('(pointer: coarse)').matches;
  let noPin = false;
  let workD = 0, workTop = 0, workX = 0, workTargetX = 0;
  const cards = $$('.wcard').length;
  const steps = $$('.pstep');

  const measure = () => {
    noPin = RM || COARSE || innerWidth < 900;
    document.body.classList.toggle('no-pin', noPin);
    if (noPin) {
      workSec.style.height = '';
      workTrack.style.transform = '';
      return;
    }
    workTrack.style.transform = 'none';
    workD = workTrack.scrollWidth - innerWidth;
    workSec.style.height = `${innerHeight + workD}px`;
    workTop = workSec.getBoundingClientRect().top + scrollY;
  };
  measure();
  addEventListener('resize', measure, { passive: true });
  addEventListener('load', () => { fitTitle(); measure(); });
  if (document.fonts?.ready) document.fonts.ready.then(() => { fitTitle(); measure(); });

  const docH = () => document.documentElement.scrollHeight - innerHeight;

  const frame = () => {
    const y = scrollY;

    // tape measure progress
    tapeFill.style.transform = `scaleX(${clamp(y / docH(), 0, 1)})`;

    // header state
    hdr.classList.toggle('scrolled', y > 30);

    // pinned horizontal scrub
    if (!noPin && workD > 0) {
      const p = clamp((y - workTop) / workD, 0, 1);
      workTargetX = -p * workD;
      workX = Math.abs(workTargetX - workX) < 0.1 ? workTargetX : lerp(workX, workTargetX, 0.14);
      workTrack.style.transform = `translate3d(${workX}px, 0, 0)`;
      workIdx.textContent = String(Math.round(p * (cards - 1)) + 1).padStart(2, '0');
      workRule.style.transform = `scaleX(${p})`;
    }

    // critical path fill
    if (procSteps) {
      const r = procSteps.getBoundingClientRect();
      const p = clamp((innerHeight * 0.72 - r.top) / r.height, 0, 1);
      procSteps.style.setProperty('--fill', p.toFixed(4));
      steps.forEach((s, i) => {
        s.classList.toggle('on', p >= (i + 0.45) / steps.length);
      });
    }

    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);

  /* ============================================================
     CAD CROSSHAIR CURSOR (fine pointers only)
     ============================================================ */
  if (FINE && !RM) {
    const xh = $('#xh');
    const v = $('#xhV'), h = $('#xhH'), dot = $('#xhDot'),
          coords = $('#xhCoords'), label = $('#xhLabel');
    let mx = innerWidth / 2, my = innerHeight / 2;
    let dx = mx, dy = my, cx = mx, cy = my;
    let armed = false;
    addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      if (!armed) { // only take over once a real pointer shows up
        armed = true;
        dx = cx = mx; dy = cy = my;
        document.body.classList.add('has-xh');
      }
    }, { passive: true });
    const loop = () => {
      dx = lerp(dx, mx, 0.55); dy = lerp(dy, my, 0.55);
      cx = lerp(cx, mx, 0.22); cy = lerp(cy, my, 0.22);
      v.style.transform = `translate3d(${mx}px,0,0)`;
      h.style.transform = `translate3d(0,${my}px,0)`;
      dot.style.transform = `translate3d(${dx}px,${dy}px,0)`;
      coords.style.transform = `translate3d(${cx + 16}px,${cy + 20}px,0)`;
      coords.textContent = `X ${String(Math.round(mx)).padStart(4, '0')} — Y ${String(Math.round(my)).padStart(4, '0')}`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    const ACT = 'a, button, label, select, input, textarea, [data-cursor]';
    // X/Y readout only over the cover sheet and the drawings — noise anywhere else
    const COORD_ZONES = '#top, .iso, .wcard-art, .about-map';
    document.addEventListener('mouseover', (e) => {
      const t = e.target.closest(ACT);
      xh.classList.toggle('is-act', !!t);
      label.textContent = t?.dataset?.cursor || t?.closest('[data-cursor]')?.dataset.cursor || '';
      xh.classList.toggle('coords-on', !!e.target.closest(COORD_ZONES));
    });
    document.addEventListener('mouseleave', () => xh.classList.remove('is-act'));
  }

  /* ============================================================
     MAGNETIC BUTTONS
     ============================================================ */
  if (FINE && !RM) {
    $$('.magnetic').forEach((el) => {
      let tx = 0, ty = 0, x = 0, y = 0, hot = false, raf = null;
      const run = () => {
        x = lerp(x, tx, 0.18); y = lerp(y, ty, 0.18);
        el.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
        if (hot || Math.abs(x) > 0.1 || Math.abs(y) > 0.1) raf = requestAnimationFrame(run);
        else { el.style.transform = ''; raf = null; }
      };
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        tx = (e.clientX - r.left - r.width / 2) * 0.28;
        ty = (e.clientY - r.top - r.height / 2) * 0.34;
        hot = true;
        if (!raf) raf = requestAnimationFrame(run);
      });
      el.addEventListener('mouseleave', () => { tx = 0; ty = 0; hot = false; });
    });
  }

  /* ============================================================
     RFP FORM (mockup transmit)
     ============================================================ */
  const form = $('#rfpForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    $('#rfpDone strong').textContent = today;
    $('#rfpDone').hidden = false;
    toast('DEMO COMPLETE — NO INFORMATION WAS SENT');
  });

  /* ============================================================
     EASTER EGG 01 — Konami → Blueprint Mode (the blue set)
     ============================================================ */
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let kIdx = 0;
  const setBlueprint = (on, announce = true) => {
    document.documentElement.classList.toggle('blueprint', on);
    $('meta[name="theme-color"]').setAttribute('content', on ? '#0B2F66' : '#F2EFE8');
    try { sessionStorage.setItem('blueprint', on ? '1' : '0'); } catch {}
    if (announce) toast(on ? 'REISSUED — CYANOTYPE SET, REV B' : 'BACK TO THE PAPER SET, REV A');
  };
  addEventListener('keydown', (e) => {
    kIdx = (e.key === KONAMI[kIdx]) ? kIdx + 1 : (e.key === KONAMI[0] ? 1 : 0);
    if (kIdx === KONAMI.length) {
      kIdx = 0;
      setBlueprint(!document.documentElement.classList.contains('blueprint'));
    }
  });
  try { if (sessionStorage.getItem('blueprint') === '1') setBlueprint(true, false); } catch {}

  /* ============================================================
     EASTER EGG 02 — hard-hat rain (click the hat in the footer)
     ============================================================ */
  const HAT = `<svg viewBox="0 0 34 34"><path d="M8 22c0-6 4-11 9-11s9 5 9 11"/><path d="M4 22h26v3H4z"/><path d="M14 11h6v4h-6z"/></svg>`;
  const hats = $('#hats');
  let hatClicks = 0;
  $('#hatTrigger').addEventListener('click', () => {
    hatClicks++;
    if (hatClicks < 3) { toast(`HARD HAT CHECK ${hatClicks}/3`); return; }
    hatClicks = 0;
    if (RM || hats.childElementCount > 60) { toast('HARD HAT AREA'); return; }
    toast('⛑ HARD HAT AREA — WATCH YOUR HEAD');
    for (let i = 0; i < 26; i++) {
      const d = document.createElement('div');
      d.className = 'hat';
      d.style.left = `${Math.random() * 96}vw`;
      d.style.setProperty('--s', `${26 + Math.random() * 30}px`);
      d.style.setProperty('--d', `${2 + Math.random() * 1.8}s`);
      d.style.setProperty('--dl', `${Math.random() * 0.7}s`);
      d.style.setProperty('--r', `${(Math.random() - 0.5) * 480}deg`);
      d.innerHTML = HAT;
      d.addEventListener('animationend', () => d.remove());
      hats.appendChild(d);
    }
  });

  /* ============================================================
     EASTER EGG 03 — for the devs reading along
     ============================================================ */
  console.log(
    `%c
        ┌─────────────────────────────┐
        │  MID-STATE CONSTRUCTION     │
        │  EST. 1958 — JACKSON, MS    │
        └──────────────┬──────────────┘
             ┌┐        │
   ══════════╪╪════════╧══╗
             ││           ║
             ││         ▄▄▄▄
             ││         ▀▀▀▀
        ─────┴┴─────────────────────
        Built by hand. No templates.
        ↑↑↓↓←→←→BA prints the blue set.
`,
    'color:#E8490F; font-family:monospace; font-size:11px; line-height:1.35;'
  );
})();
