import createGlobe from 'cobe';

const canvas = document.querySelector<HTMLCanvasElement>('#hero-globe');
const hero = document.querySelector<HTMLElement>('.hero');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
const mobile = matchMedia('(max-width: 760px)').matches;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

const setResolveProgress = (rawProgress: number) => {
  if (!hero) return 1;
  const progress = easeOutCubic(clamp01(rawProgress));
  hero.style.setProperty('--focus-scale', (0.72 + progress * 0.28).toFixed(4));
  hero.style.setProperty('--focus-outer-scale', (0.84 + progress * 0.16).toFixed(4));
  hero.style.setProperty('--focus-opacity', (0.26 + progress * 0.74).toFixed(4));
  hero.style.setProperty('--focus-blur', `${((1 - progress) * 4).toFixed(2)}px`);
  hero.style.setProperty('--instrument-opacity', (0.22 + progress * 0.78).toFixed(4));
  hero.style.setProperty('--signal-scale', (0.18 + progress * 0.82).toFixed(4));
  hero.style.setProperty('--periphery-opacity', (0.88 - progress * 0.34).toFixed(4));
  hero.classList.toggle('is-resolved', progress > 0.995);
  return progress;
};

if (hero) {
  hero.classList.add('hero-enhanced');
  setResolveProgress(reduceMotion || connection?.saveData ? 1 : 0);
}

if (canvas && !connection?.saveData) {
  const dpr = Math.min(devicePixelRatio || 1, mobile ? 1 : 1.35);
  const startPhi = reduceMotion ? 0.32 : (mobile ? 0.16 : -0.08);
  const finalPhi = 0.32;
  const theta = mobile ? 0.2 : 0.23;
  const duration = mobile ? 1050 : 1650;

  let width = 1;
  let height = 1;
  let progress = reduceMotion ? 1 : 0;
  let lastFrame = 0;
  let frame = 0;
  let intersecting = true;
  let disposed = false;

  const measure = () => {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
  };

  measure();

  const globe = createGlobe(canvas, {
    devicePixelRatio: dpr,
    width: Math.round(width),
    height: Math.round(height),
    phi: startPhi,
    theta,
    dark: 1,
    diffuse: 1.12,
    scale: mobile ? 1.05 : 1.09,
    mapSamples: mobile ? 3600 : 8200,
    mapBrightness: 7,
    mapBaseBrightness: 0.1,
    baseColor: [0.035, 0.18, 0.46],
    markerColor: [1, 0.34, 0.25],
    glowColor: [0.055, 0.28, 0.66],
    markers: []
  });

  const render = (rawProgress: number) => {
    const eased = setResolveProgress(rawProgress);
    const phi = startPhi + (finalPhi - startPhi) * eased;
    globe.update({
      phi,
      theta,
      width: Math.round(width),
      height: Math.round(height),
      scale: mobile ? 1.05 : 1.09
    });
  };

  render(progress);
  requestAnimationFrame(() => canvas.classList.add('ready'));

  const tick = (time: number) => {
    if (disposed || reduceMotion || progress >= 1) {
      frame = 0;
      return;
    }
    if (!intersecting || document.hidden) {
      lastFrame = 0;
      frame = 0;
      return;
    }

    if (lastFrame === 0) lastFrame = time;
    else {
      progress = clamp01(progress + (time - lastFrame) / duration);
      lastFrame = time;
    }

    render(progress);

    if (progress < 1) frame = requestAnimationFrame(tick);
    else {
      render(1);
      lastFrame = 0;
      frame = 0;
    }
  };

  const startResolve = () => {
    if (disposed || reduceMotion || progress >= 1 || frame || !intersecting || document.hidden) return;
    frame = requestAnimationFrame(tick);
  };

  if (reduceMotion) render(1);
  else requestAnimationFrame(startResolve);

  const resizeObserver = new ResizeObserver(() => {
    measure();
    render(progress);
  });
  resizeObserver.observe(canvas);

  const visibility = new IntersectionObserver(([entry]) => {
    intersecting = entry.isIntersecting;
    if (!intersecting && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
      lastFrame = 0;
      return;
    }
    startResolve();
  }, { threshold: 0.01 });
  visibility.observe(canvas);

  const onVisibility = () => {
    if (document.hidden && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
      lastFrame = 0;
      return;
    }
    startResolve();
  };

  const onContextLost = () => {
    hero?.classList.add('gpu-fallback');
    canvas.hidden = true;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    lastFrame = 0;
    setResolveProgress(1);
  };

  document.addEventListener('visibilitychange', onVisibility);
  canvas.addEventListener('webglcontextlost', onContextLost);

  addEventListener('pagehide', () => {
    disposed = true;
    if (frame) cancelAnimationFrame(frame);
    visibility.disconnect();
    resizeObserver.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    canvas.removeEventListener('webglcontextlost', onContextLost);
    globe.destroy();
  }, { once: true });
} else if (canvas) {
  canvas.hidden = true;
  hero?.classList.add('gpu-fallback');
  setResolveProgress(1);
}
