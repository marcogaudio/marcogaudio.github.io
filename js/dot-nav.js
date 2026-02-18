/**
 * Floating dot navigation
 * Dynamically creates fixed dots on the right side tracking section progress
 */

export function initDotNav() {
  // Hidden on mobile
  if (window.innerWidth < 992) return;

  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;

  // Build nav
  const nav = document.createElement('nav');
  nav.className = 'dot-nav';
  nav.setAttribute('aria-label', 'Section navigation');

  const labels = {
    description: 'About',
    skills: 'Skills',
    experience: 'Experience',
    education: 'Education',
    portfolio: 'Portfolio',
    contact: 'Contact'
  };

  sections.forEach(section => {
    const id = section.id;
    const btn = document.createElement('a');
    btn.href = '#' + id;
    btn.className = 'dot-nav-item';
    btn.dataset.label = labels[id] || id;
    btn.setAttribute('aria-label', labels[id] || id);

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      section.scrollIntoView({ behavior: 'smooth' });
    });

    nav.appendChild(btn);
  });

  document.body.appendChild(nav);

  // Show/hide based on scroll past hero
  const hero = document.querySelector('.masthead');
  let navVisible = false;

  function toggleNav() {
    const pastHero = window.scrollY > (hero ? hero.offsetHeight * 0.8 : 300);
    if (pastHero && !navVisible) {
      nav.classList.add('visible');
      navVisible = true;
    } else if (!pastHero && navVisible) {
      nav.classList.remove('visible');
      navVisible = false;
    }
  }

  window.addEventListener('scroll', toggleNav, { passive: true });
  toggleNav();

  // Track active section
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        nav.querySelectorAll('.dot-nav-item').forEach(d => d.classList.remove('active'));
        const dot = nav.querySelector(`[href="#${entry.target.id}"]`);
        if (dot) dot.classList.add('active');
      }
    });
  }, { threshold: 0.3, rootMargin: '-20% 0px -60% 0px' });

  sections.forEach(section => observer.observe(section));
}
