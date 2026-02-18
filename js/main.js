/**
 * Main entry point — ES module
 * Initializes all site modules
 */

import { initNav } from './modern-nav.js';
import { initPortfolio } from './modern-portfolio.js';
import { initAnimations } from './modern-animations.js';
import { initDarkMode } from './dark-mode.js';
import { initMouseGlow } from './mouse-glow.js';
import { initTypingEffect } from './typing-effect.js';
import { initCounters } from './counters.js';
import { initDotNav } from './dot-nav.js';

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initPortfolio();
  initAnimations();
  initDarkMode();
  initScrollProgress();
  initMouseGlow();
  initTypingEffect();
  initCounters();
  initDotNav();
});

// Scroll progress bar
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;

  function update() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}
