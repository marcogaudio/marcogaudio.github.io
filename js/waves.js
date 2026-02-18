/**
 * Floating Particles Background
 * Subtle drifting dots with parallax depth effect
 * Respects prefers-reduced-motion, pauses when tab is hidden
 */

function createParticleBackground(targetId) {
  const container = document.getElementById(targetId);
  if (!container) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let animationId = null;
  let paused = false;

  const PARTICLE_COUNT = 50;
  const COLORS = [
    'rgba(96, 165, 250,',   // light blue
    'rgba(59, 130, 246,',   // medium blue
    'rgba(37, 99, 235,',    // vivid blue
    'rgba(147, 197, 253,',  // pale blue
    'rgba(255, 255, 255,',  // white
  ];

  function resize() {
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  function createParticle() {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const opacity = 0.1 + Math.random() * 0.4;
    const radius = 1.5 + Math.random() * 3;
    const speed = 0.15 + Math.random() * 0.35;
    const swayAmplitude = 15 + Math.random() * 25;
    const swaySpeed = 0.0005 + Math.random() * 0.001;

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: radius,
      color: color,
      opacity: opacity,
      speed: speed,
      swayAmplitude: swayAmplitude,
      swaySpeed: swaySpeed,
      swayOffset: Math.random() * Math.PI * 2,
      baseX: Math.random() * width,
    };
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle());
    }
  }

  function draw() {
    if (paused) return;

    ctx.clearRect(0, 0, width, height);
    const now = Date.now();

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Move upward
      p.y -= p.speed;

      // Horizontal sway
      p.x = p.baseX + Math.sin(now * p.swaySpeed + p.swayOffset) * p.swayAmplitude;

      // Reset when off top
      if (p.y < -10) {
        p.y = height + 10;
        p.baseX = Math.random() * width;
        p.x = p.baseX;
      }

      // Draw circle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.opacity + ')';
      ctx.fill();
    }

    animationId = requestAnimationFrame(draw);
  }

  // Static dots for reduced motion
  function drawStatic() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.opacity + ')';
      ctx.fill();
    }
  }

  resize();
  initParticles();

  if (prefersReducedMotion) {
    drawStatic();
    return;
  }

  // Pause when tab hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      paused = true;
      if (animationId) cancelAnimationFrame(animationId);
    } else {
      paused = false;
      draw();
    }
  });

  // Resize handler
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      // Re-distribute particles on resize
      for (let i = 0; i < particles.length; i++) {
        particles[i].baseX = Math.random() * width;
        particles[i].x = particles[i].baseX;
        if (particles[i].y > height) particles[i].y = Math.random() * height;
      }
    }, 200);
  });

  draw();
}

document.addEventListener('DOMContentLoaded', () => {
  createParticleBackground('waves-js');
});
