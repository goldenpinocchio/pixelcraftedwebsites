/* ============================================
   Pixel Crafted Websites — JS
   ============================================ */

// --- Style Switcher ---
(function () {
  const STORAGE_KEY = 'pcw-style';
  const VALID_STYLES = ['default', 'bakery', 'law', 'spa'];

  function getStoredStyle() {
    return localStorage.getItem(STORAGE_KEY) || 'default';
  }

  function applyStyle(style) {
    if (!VALID_STYLES.includes(style)) style = 'default';
    document.documentElement.setAttribute('data-style', style);
    localStorage.setItem(STORAGE_KEY, style);

    // Update active button
    document.querySelectorAll('.style-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-style') === style);
    });
  }

  // Init on load
  applyStyle(getStoredStyle());

  // Button clicks
  document.querySelectorAll('.style-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyStyle(btn.getAttribute('data-style'));
    });
  });
})();

// --- Theme Toggle (light/dark) ---
(function () {
  const html = document.documentElement;
  const btn = document.getElementById('themeToggle');

  // Restore saved theme
  const saved = localStorage.getItem('pcw-theme') || 'dark';
  html.setAttribute('data-theme', saved);

  function updateIcon() {
    const isLight = html.getAttribute('data-theme') === 'light';
    btn.querySelector('.sun').style.display = isLight ? 'none' : '';
    btn.querySelector('.moon').style.display = isLight ? '' : 'none';
  }

  updateIcon();

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
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
      const isOpen = links.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
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
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.card, .section-label, .section-title, .section-desc').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
})();
