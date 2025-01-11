/**
 * Animated Waves using SVG and JavaScript
 * Inspired by the simplicity of particles.js
 */

// Append an SVG wave element to a target container
function createWaveBackground(targetId) {
  const container = document.getElementById(targetId);

  if (!container) {
    console.error(`Container with ID '${targetId}' not found.`);
    return;
  }

  // Create the SVG element
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("viewBox", "0 0 1440 320");
  svg.setAttribute("preserveAspectRatio", "none");
  
  // Create paths for six waves with different properties
  const waves = [];
  const waveColors = ["#a2d2ff", "#4d94ff", "#2a6bbd", "#a2d2ff", "#4d94ff", "#2a6bbd"];
  const waveAmplitudes = [20, 30, 40, 20, 30, 40];
  const waveOffsets = [0, Math.PI / 2, Math.PI, Math.PI / 2, Math.PI, 0];  // Different initial offsets for each wave
  
  // Create top waves
  for (let i = 0; i < 3; i++) {
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("fill", waveColors[i]);
    path.setAttribute("fill-opacity", "1");
    svg.appendChild(path);
    waves.push(path);
  }

  // Create bottom waves
  for (let i = 3; i < 6; i++) {
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("fill", waveColors[i]);
    path.setAttribute("fill-opacity", "1");
    svg.appendChild(path);
    waves.push(path);
  }
  
  container.appendChild(svg);

  // Animation loop
  let offset = 0;

  function animateWaves() {
    offset += 0.01; // Slower speed by reducing increment

    // Update each wave's path with different amplitude and offset
    for (let i = 0; i < 6; i++) {
      const amplitude = waveAmplitudes[i];
      let yPosition;

      if (i < 3) {
        // Top waves
        yPosition = 49 + i * 20; // Move waves higher at the top
      } else {
        // Bottom waves (near the bottom of the container)
        yPosition = 240 + (i - 3) * 20; // Move waves lower at the bottom
      }
      
      const d = `M0,${yPosition} C320,${yPosition + Math.sin(offset + waveOffsets[i]) * amplitude} 640,${yPosition + Math.sin(offset + waveOffsets[i] + 2) * amplitude} 960,${yPosition + Math.sin(offset + waveOffsets[i] + 4) * amplitude} 1280,${yPosition + Math.sin(offset + waveOffsets[i] + 6) * amplitude} 1440,${yPosition} L1440,320 L0,320 Z`;
      waves[i].setAttribute("d", d);
    }

    requestAnimationFrame(animateWaves);
  }

  animateWaves();
}

// Initialize the wave background on a container with ID "wave-bg"
document.addEventListener("DOMContentLoaded", () => {
  createWaveBackground("waves-js");
});
