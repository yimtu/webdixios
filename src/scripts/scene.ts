import createGlobe from 'cobe';

const canvas = document.querySelector<HTMLCanvasElement>('#hero-globe');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;

if (canvas && !connection?.saveData) {
  const mobile = matchMedia('(max-width: 760px)').matches;
  const dpr = Math.min(devicePixelRatio || 1, mobile ? 1 : 1.35);
  let width = 1;
  let height = 1;
  let phi = 4.55;
  let running = true;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
  };

  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  const globe = createGlobe(canvas, {
    devicePixelRatio: dpr,
    width: Math.round(width * dpr),
    height: Math.round(height * dpr),
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
      if (!reduceMotion) phi += mobile ? 0.00115 : 0.00155;
      state.phi = phi;
      state.width = Math.round(width * dpr);
      state.height = Math.round(height * dpr);
    }
  });

  requestAnimationFrame(() => canvas.classList.add('ready'));

  const visibility = new IntersectionObserver(([entry]) => {
    const shouldRun = entry.isIntersecting && !document.hidden;
    if (shouldRun !== running) {
      globe.toggle();
      running = shouldRun;
    }
  }, { threshold: 0.01 });
  visibility.observe(canvas);

  const onVisibility = () => {
    const shouldRun = !document.hidden && canvas.getBoundingClientRect().bottom > 0;
    if (shouldRun !== running) {
      globe.toggle();
      running = shouldRun;
    }
  };
  document.addEventListener('visibilitychange', onVisibility);

  addEventListener('pagehide', () => {
    visibility.disconnect();
    resizeObserver.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    globe.destroy();
  }, { once: true });
} else if (canvas) {
  canvas.hidden = true;
}
