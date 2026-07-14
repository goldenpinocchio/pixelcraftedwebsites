/* ============================================
   Pixel Crafted Websites — JS
   ============================================ */

// --- Style Switcher ---
(function () {
  const STORAGE_KEY = 'pcw-style';
  const VALID_STYLES = ['default', 'bakery', 'law', 'spa', 'dusk', 'ember', 'moss', 'paper'];

  function getStoredStyle() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && VALID_STYLES.includes(saved)) return saved;
    return localStorage.getItem('pcw-theme') === 'dark' ? 'spa' : 'default';
  }

  function applyStyle(style) {
    if (!VALID_STYLES.includes(style)) style = 'default';
    document.documentElement.setAttribute('data-style', style);
    localStorage.setItem(STORAGE_KEY, style);
    document.querySelectorAll('.style-btn, .style-label').forEach(btn => {
      const isActive = btn.getAttribute('data-style') === style;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  applyStyle(getStoredStyle());

  document.querySelectorAll('.style-btn').forEach(btn => {
    btn.addEventListener('click', () => applyStyle(btn.getAttribute('data-style')));
  });

  document.querySelectorAll('.style-label').forEach(btn => {
    btn.addEventListener('click', () => applyStyle(btn.getAttribute('data-style')));
  });
})();

// --- Theme Toggle ---
(function () {
  const html = document.documentElement;
  const btn = document.getElementById('themeToggle');

  const saved = localStorage.getItem('pcw-theme') || 'light';
  html.setAttribute('data-theme', saved);

  function updateIcon() {
    const isLight = html.getAttribute('data-theme') === 'light';
    const sun = btn.querySelector('.sun');
    const moon = btn.querySelector('.moon');
    if (sun) sun.style.display = isLight ? 'none' : '';
    if (moon) moon.style.display = isLight ? '' : 'none';
  }

  updateIcon();

  btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('pcw-theme', next);
    updateIcon();
  });
})();

// --- Mobile Nav ---
(function () {
  const hamburger = document.getElementById('navHamburger');
  const links = document.getElementById('navLinks');

  if (hamburger && links) {
    hamburger.addEventListener('click', () => {
      links.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', links.classList.contains('open'));
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();

// --- Scroll Reveal ---
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.card, .section-label, .section-title, .section-desc, .reveal').forEach(el => {
    observer.observe(el);
  });
})();

// --- Portfolio Demo Tabs ---
(function () {
  document.querySelectorAll('[data-demo-shell]').forEach(shell => {
    const tabs = Array.from(shell.querySelectorAll('[data-demo-tab]'));
    const panels = Array.from(shell.querySelectorAll('[data-demo-panel]'));

    if (!tabs.length || !panels.length) return;

    const setActive = (tabName) => {
      tabs.forEach(tab => {
        const isActive = tab.getAttribute('data-demo-tab') === tabName;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      panels.forEach(panel => {
        panel.classList.toggle('active', panel.getAttribute('data-demo-panel') === tabName);
      });
    };

    const initial = tabs.find(tab => tab.classList.contains('active')) || tabs[0];
    setActive(initial.getAttribute('data-demo-tab'));

    tabs.forEach(tab => {
      tab.addEventListener('click', () => setActive(tab.getAttribute('data-demo-tab')));
    });
  });

  document.querySelectorAll('[data-demo-tab-target]').forEach(button => {
    button.addEventListener('click', () => {
      const shell = button.closest('[data-demo-shell]');
      const target = button.getAttribute('data-demo-tab-target');
      if (!shell || !target) return;
      const tab = shell.querySelector(`[data-demo-tab="${target}"]`);
      if (tab) tab.click();
    });
  });
})();
