import createGlobe from 'cobe';

type FocusLocation = [number, number];
type GlobeMarker = {
  location: FocusLocation;
  size: number;
  color?: [number, number, number];
};

const canvas = document.querySelector<HTMLCanvasElement>('#hero-globe');
const hero = document.querySelector<HTMLElement>('.hero');
const markerData = document.querySelector<HTMLScriptElement>('#hero-focus-markers');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
const mobile = matchMedia('(max-width: 760px)').matches;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

const parseFocusLocations = (): FocusLocation[] => {
  if (!markerData?.textContent) return [];
  try {
    const parsed = JSON.parse(markerData.textContent) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((point): point is FocusLocation => (
      Array.isArray(point) &&
      point.length === 2 &&
      typeof point[0] === 'number' && Number.isFinite(point[0]) &&
      typeof point[1] === 'number' && Number.isFinite(point[1])
    ));
  } catch {
    return [];
  }
};

const setResolveProgress = (rawProgress: number) => {
  if (!hero) return 1;
  const progress = easeOutCubic(clamp01(rawProgress));
  hero.style.setProperty('--focus-scale', (0.82 + progress * 0.18).toFixed(4));
  hero.style.setProperty('--focus-outer-scale', (0.9 + progress * 0.1).toFixed(4));
  hero.style.setProperty('--focus-opacity', (0.42 + progress * 0.58).toFixed(4));
  hero.style.setProperty('--focus-blur', `${((1 - progress) * 2.4).toFixed(2)}px`);
  hero.style.setProperty('--instrument-opacity', (0.28 + progress * 0.72).toFixed(4));
  hero.style.setProperty('--signal-scale', (0.26 + progress * 0.74).toFixed(4));
  hero.style.setProperty('--periphery-opacity', (0.52 + progress * 0.48).toFixed(4));
  hero.classList.toggle('is-resolved', progress > 0.995);
  return progress;
};

if (hero) {
  hero.classList.add('hero-enhanced');
  setResolveProgress(reduceMotion || connection?.saveData ? 1 : 0);
}

if (canvas && !connection?.saveData) {
  const dpr = Math.min(devicePixelRatio || 1, mobile ? 1 : 1.35);
  const startPhi = reduceMotion ? 0.22 : (mobile ? 0.05 : -0.18);
  const finalPhi = 0.22;
  const theta = mobile ? 0.34 : 0.39;
  const duration = mobile ? 980 : 1550;

  const allFocusLocations = parseFocusLocations();
  const visibleFocusLocations = mobile
    ? allFocusLocations.filter((_, index) => index % 2 === 0)
    : allFocusLocations;

  // These are regular geographic samples used only to raise local visual resolution.
  // They are not observations, metrics, city markers, or claims about activity.
  const focusMarkers: GlobeMarker[] = visibleFocusLocations.map((location, index) => ({
    location,
    size: mobile ? 0.0085 : (index % 5 === 0 ? 0.0115 : 0.0095),
    color: index % 7 === 0 ? [0.98, 1, 1] : [0.46, 0.9, 1]
  }));

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
    diffuse: 1.45,
    scale: mobile ? 1.04 : 1.08,
    mapSamples: mobile ? 6800 : 16000,
    mapBrightness: mobile ? 5.8 : 6.6,
    mapBaseBrightness: 0.035,
    baseColor: [0.36, 0.7, 1],
    markerColor: [0.62, 0.93, 1],
    glowColor: [0.035, 0.22, 0.54],
    markerElevation: 0.004,
    opacity: 0.98,
    markers: focusMarkers
  });

  const render = (rawProgress: number) => {
    const eased = setResolveProgress(rawProgress);
    const phi = startPhi + (finalPhi - startPhi) * eased;
    globe.update({
      phi,
      theta,
      width: Math.round(width),
      height: Math.round(height),
      scale: mobile ? 1.04 : 1.08
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
