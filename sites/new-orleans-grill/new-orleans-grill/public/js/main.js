(() => {
  'use strict';

  /* ---------- mobile nav ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- menu tabs ---------- */
  const tabs = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.ticket-list');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach((t) => {
        t.classList.toggle('is-active', t === tab);
        t.setAttribute('aria-selected', String(t === tab));
      });
      panels.forEach((panel) => {
        const match = panel.dataset.panel === target;
        panel.classList.toggle('is-active', match);
        panel.hidden = !match;
      });
    });
  });

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- kitchen status ticket ----------
     Real hours: Breakfast 8-11 Tue-Sat, Lunch 11-2 Mon-Sat,
     Dinner 5-9 Mon-Sat, closed Sunday. */
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function kitchenStatus(now) {
    const day = now.getDay();
    const mins = now.getHours() * 60 + now.getMinutes();
    const at = (h, m = 0) => h * 60 + m;

    if (day === 0) {
      return { open: false, status: 'Closed today', note: 'Back Monday at 11 AM for lunch.' };
    }

    const hasBreakfast = day >= 2 && day <= 6; // Tue-Sat
    if (hasBreakfast && mins >= at(8) && mins < at(11)) {
      return { open: true, status: 'Open now — serving breakfast', note: 'Breakfast runs until 11 AM.' };
    }
    if (mins >= at(11) && mins < at(14)) {
      return { open: true, status: 'Open now — serving lunch', note: 'Lunch runs until 2 PM.' };
    }
    if (mins >= at(17) && mins < at(21)) {
      return { open: true, status: 'Open now — serving dinner', note: 'Dinner runs until 9 PM.' };
    }
    if (mins >= at(14) && mins < at(17)) {
      return { open: false, status: 'Closed between lunch and dinner', note: 'Kitchen reopens at 5 PM.' };
    }
    if (mins < at(8) || (!hasBreakfast && mins < at(11))) {
      const note = day === 1 ? 'Lunch starts at 11 AM.' : 'Breakfast starts at 8 AM.';
      return { open: false, status: 'Not open yet', note };
    }
    // after 9 PM
    if (day === 6) {
      return { open: false, status: 'Closed for the night', note: 'Closed Sunday. Back Monday at 11 AM.' };
    }
    return { open: false, status: 'Closed for the night', note: `Back ${DAYS[(day + 1) % 7]} at 8 AM for breakfast.` };
  }

  function renderStatus() {
    const statusEl = document.getElementById('ticket-status');
    const noteEl = document.getElementById('ticket-note');
    if (!statusEl || !noteEl) return;
    const { open, status, note } = kitchenStatus(new Date());
    statusEl.textContent = status;
    statusEl.classList.toggle('is-open', open);
    statusEl.classList.toggle('is-closed', !open);
    noteEl.textContent = note;
  }
  renderStatus();
  setInterval(renderStatus, 60 * 1000);

  /* ---------- a little something for the curious ---------- */
  console.log(
    '%c%s',
    'font-family: monospace; white-space: pre; color: #d69257;',
    [
      '   ___________________________',
      '  | NEW ORLEANS GRILL          |',
      '  | table: your browser        |',
      '  |-----------------------------|',
      '  | 1  curiosity ......  no chg |',
      '  | 1  view-source ....  on us  |',
      '  |-----------------------------|',
      '  | Say Billy sent you.         |',
      '  |_____________________________|',
    ].join('\n')
  );
})();
