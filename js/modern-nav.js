/**
 * Modern Navigation — vanilla JS replacement for jQuery agency.js
 * Handles: navbar shrink, smooth scroll, scrollspy, mobile menu toggle
 */

export function initNav() {
  const nav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.js-scroll-trigger[href*="#"]');
  const navCollapse = document.getElementById('navbarResponsive');
  const navToggler = document.querySelector('.navbar-toggler');
  const sections = document.querySelectorAll('section[id], header[id]');

  // Navbar shrink on scroll (throttled via rAF)
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrolled = window.scrollY > 100;
      nav.classList.toggle('navbar-shrink', scrolled);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Smooth scroll with easing
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function smoothScroll(target, duration = 800) {
    const start = window.scrollY;
    const targetEl = document.querySelector(target);
    if (!targetEl) return;
    const targetY = targetEl.getBoundingClientRect().top + window.scrollY - 54;
    const distance = targetY - start;
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, start + distance * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        smoothScroll(href);
        // Close mobile menu
        if (navCollapse.classList.contains('show')) {
          navCollapse.classList.remove('show');
        }
      }
    });
  });

  // Mobile menu toggle
  if (navToggler) {
    navToggler.addEventListener('click', () => {
      navCollapse.classList.toggle('show');
      const expanded = navCollapse.classList.contains('show');
      navToggler.setAttribute('aria-expanded', expanded);
    });
  }

  // ScrollSpy via IntersectionObserver
  const observerOptions = {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}
