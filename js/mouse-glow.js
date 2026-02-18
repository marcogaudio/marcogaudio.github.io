/**
 * Mouse-follow glow effect
 * Adds a subtle radial gradient spotlight that follows the cursor on [data-glow] sections
 */

export function initMouseGlow() {
  // Disable on touch devices or reduced motion
  if ('ontouchstart' in window || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  document.querySelectorAll('[data-glow]').forEach(section => {
    section.addEventListener('mousemove', (e) => {
      const rect = section.getBoundingClientRect();
      section.style.setProperty('--glow-x', (e.clientX - rect.left) + 'px');
      section.style.setProperty('--glow-y', (e.clientY - rect.top) + 'px');
    });
  });
}
