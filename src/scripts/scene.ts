import createGlobe from 'cobe';

const canvas = document.querySelector<HTMLCanvasElement>('#hero-globe');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;

if (canvas && !connection?.saveData) {
  const mobile = matchMedia('(max-width: 760px)').matches;
  let width = 0;
  let height = 0;
  let phi = 4.55;
  let last = performance.now();
  let frameAccumulator = 0;
  let frameCount = 0;
  let adaptiveDpr = Math.min(devicePixelRatio || 1, mobile ? 1 : 1.35);

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
  };

  resize();
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);

  const globe = createGlobe(canvas, {
    devicePixelRatio: adaptiveDpr,
    width: Math.round(width * adaptiveDpr),
    height: Math.round(height * adaptiveDpr),
    phi,
    theta: 0.23,
    dark: 1,
    diffuse: 1.15,
    scale: mobile ? 1.03 : 1.08,
    mapSamples: mobile ? 5200 : 9000,
    mapBrightness: 7.2,
    baseColor: [0.035, 0.18, 0.46],
    markerColor: [1, 0.34, 0.25],
    glowColor: [0.055, 0.28, 0.66],
    markers: [],
    onRender: (state) => {
      const now = performance.now();
      const dt = Math.max(1, now - last);
      last = now;
      frameAccumulator += dt;
      frameCount += 1;

      if (!reduceMotion) phi += mobile ? 0.00115 : 0.00155;
      state.phi = phi;
      state.width = Math.round(width * adaptiveDpr);
      state.height = Math.round(height * adaptiveDpr);
      state.devicePixelRatio = adaptiveDpr;

      if (frameCount >= 48) {
        const fps = 1000 / (frameAccumulator / frameCount);
        if (fps < 46 && adaptiveDpr > 1) adaptiveDpr = Math.max(1, adaptiveDpr - 0.15);
        frameAccumulator = 0;
        frameCount = 0;
      }
    }
  });

  requestAnimationFrame(() => canvas.classList.add('ready'));

  const visibility = new IntersectionObserver(([entry]) => {
    canvas.style.visibility = entry.isIntersecting ? 'visible' : 'hidden';
  }, { threshold: 0.01 });
  visibility.observe(canvas);

  addEventListener('pagehide', () => {
    visibility.disconnect();
    observer.disconnect();
    globe.destroy();
  }, { once: true });
} else if (canvas) {
  canvas.hidden = true;
}
