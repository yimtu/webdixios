const canvas = document.querySelector<HTMLCanvasElement>('#hero-webgl');
const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const load = async () => {
  if (!canvas || connection?.saveData || reduceMotion) {
    document.documentElement.classList.add('no-webgl');
    return;
  }
  try {
    await import('./scene-impl');
  } catch (error) {
    console.info('[Dixios] Optional visual layer could not load.', error);
    document.documentElement.classList.add('no-webgl');
    if (canvas) canvas.hidden = true;
  }
};

if ('requestIdleCallback' in window) {
  (window as Window & { requestIdleCallback: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number })
    .requestIdleCallback(() => void load(), { timeout: 650 });
} else {
  setTimeout(() => void load(), 120);
}
