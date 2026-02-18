/**
 * Typewriter effect for hero section
 * Cycles through role titles with type-delete-retype animation
 */

export function initTypingEffect() {
  const container = document.querySelector('.typing-text');
  if (!container) return;

  // Fall back to static text for reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    container.textContent = container.dataset.phrases?.split('|')[0] || '';
    return;
  }

  const phrases = (container.dataset.phrases || '').split('|');
  if (!phrases.length) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeSpeed = 80;
  const deleteSpeed = 40;
  const pauseAfterType = 2000;
  const pauseAfterDelete = 500;

  // Delay start to let hero fade-in complete
  setTimeout(tick, 1200);

  function tick() {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      container.textContent = current.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(tick, pauseAfterType);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      container.textContent = current.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, pauseAfterDelete);
        return;
      }
      setTimeout(tick, deleteSpeed);
    }
  }
}
