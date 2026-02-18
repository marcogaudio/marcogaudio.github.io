/**
 * Scroll-reveal animations using IntersectionObserver
 * Elements with [data-animate] get class "will-animate" on init, then "animated" when visible
 */

export function initAnimations() {
  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const animatedElements = document.querySelectorAll('[data-animate]');

  animatedElements.forEach(el => {
    el.classList.add('will-animate');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.animateDelay || 0;

        setTimeout(() => {
          el.classList.add('animated');

          // Trigger skill bar fills
          if (el.dataset.animate === 'skillBar') {
            el.querySelectorAll('.skill-fill').forEach(bar => {
              bar.style.width = bar.dataset.skillPct || '0%';
            });
          }
        }, parseInt(delay));

        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}
