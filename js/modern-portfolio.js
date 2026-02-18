/**
 * Modern Portfolio — vanilla JS replacement for jQuery portfolio.js
 * Handles: category filtering with CSS transitions, modal open/close with keyboard support
 */

export function initPortfolio() {
  const buttonContainer = document.getElementById('portfolio-button-container');
  const portfolioItems = document.querySelectorAll('#portfolio-items .portfolio-item');

  if (!buttonContainer) return;

  // Category filtering
  buttonContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-portfolio-section]');
    if (!btn) return;

    const category = btn.dataset.portfolioSection;

    // Update active button
    buttonContainer.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Filter items with transition
    portfolioItems.forEach(item => {
      if (category === 'all' || item.classList.contains(category)) {
        item.classList.remove('hiding');
        item.style.display = '';
      } else {
        item.classList.add('hiding');
        setTimeout(() => {
          if (item.classList.contains('hiding')) {
            item.style.display = 'none';
          }
        }, 300);
      }
    });
  });

  // Modal handling
  initModals();
}

function initModals() {
  const modalLinks = document.querySelectorAll('[data-toggle="modal"]');
  let lastFocusedElement = null;

  modalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const modal = document.querySelector(targetId);
      if (modal) openModal(modal);
    });
  });

  function openModal(modal) {
    lastFocusedElement = document.activeElement;
    modal.classList.add('show');
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';

    // Hide navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.classList.add('d-none');

    // Add backdrop
    let backdrop = document.querySelector('.modal-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop fade show';
      document.body.appendChild(backdrop);
    }

    // Focus trap
    const focusable = modal.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();

    // Close handlers
    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(modal), { once: true });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal-dialog')) {
        closeModal(modal);
      }
    });

    // ESC key
    function onKeydown(e) {
      if (e.key === 'Escape') {
        closeModal(modal);
        document.removeEventListener('keydown', onKeydown);
      }
      // Focus trap
      if (e.key === 'Tab' && focusable.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', onKeydown);
  }

  function closeModal(modal) {
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';

    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.classList.remove('d-none');

    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) backdrop.remove();

    if (lastFocusedElement) lastFocusedElement.focus();
  }
}
