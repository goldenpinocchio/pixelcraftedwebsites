/* ============================================
   Pixel Crafted Websites — JS
   ============================================ */

// --- Theme Toggle ---
(function () {
  const html = document.documentElement;
  const btn = document.getElementById('themeToggle');

  // Restore saved preference
  const saved = localStorage.getItem('pcw-theme');
  if (saved) {
    html.setAttribute('data-theme', saved);
    btn.textContent = saved === 'light' ? '◑' : '◐';
  }

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('pcw-theme', next);
    btn.textContent = next === 'light' ? '◑' : '◐';
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

    // Close on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();

// --- Scroll reveal ---
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .section-label, .section-title, .section-desc').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
})();
