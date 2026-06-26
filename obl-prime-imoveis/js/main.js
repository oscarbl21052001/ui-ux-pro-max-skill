document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileNav();
  initScrollReveal();
  initCounters();
  initFavorites();
  initSmoothScroll();
});

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.nav-overlay');
  const closeBtn = document.querySelector('.nav-close');

  if (!hamburger || !navLinks) return;

  const toggle = (open) => {
    navLinks.classList.toggle('open', open);
    if (overlay) overlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  hamburger.addEventListener('click', () => toggle(true));
  if (overlay) overlay.addEventListener('click', () => toggle(false));
  if (closeBtn) closeBtn.addEventListener('click', () => toggle(false));

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggle(false));
  });
}

function initScrollReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    observer.observe(el);
  });
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';

        if (prefersReduced) {
          el.textContent = target + suffix;
        } else {
          animateCounter(el, target, suffix);
        }
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el, target, suffix) {
  const duration = 2000;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

function initFavorites() {
  document.addEventListener('click', (e) => {
    const fav = e.target.closest('.property-fav');
    if (!fav) return;

    e.preventDefault();
    e.stopPropagation();
    fav.classList.toggle('active');

    const id = fav.dataset.id;
    if (!id) return;

    let favs = JSON.parse(localStorage.getItem('obl_favorites') || '[]');
    if (fav.classList.contains('active')) {
      if (!favs.includes(id)) favs.push(id);
    } else {
      favs = favs.filter(f => f !== id);
    }
    localStorage.setItem('obl_favorites', JSON.stringify(favs));
  });

  const favs = JSON.parse(localStorage.getItem('obl_favorites') || '[]');
  favs.forEach(id => {
    const el = document.querySelector(`.property-fav[data-id="${id}"]`);
    if (el) el.classList.add('active');
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
