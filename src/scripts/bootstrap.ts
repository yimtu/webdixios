import './motion';

const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas = document.querySelector<HTMLCanvasElement>('#hero-webgl');

const loadScene = async () => {
  if (!canvas || connection?.saveData) return;
  try {
    await import('./scene');
  } catch (error) {
    console.info('[Dixios] Optional visual layer could not load.', error);
    document.documentElement.classList.add('no-webgl');
  }
};

if (reduceMotion) {
  // The CSS/SVG fallback is already complete; avoid downloading Three.js for users
  // who explicitly request reduced motion.
  document.documentElement.classList.add('no-webgl');
} else if ('requestIdleCallback' in window) {
  (window as Window & { requestIdleCallback: (cb: IdleRequestCallback, opts?: IdleRequestOptions) => number })
    .requestIdleCallback(() => void loadScene(), { timeout: 650 });
} else {
  setTimeout(() => void loadScene(), 120);
}
