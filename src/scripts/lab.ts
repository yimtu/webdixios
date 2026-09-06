import createGlobe from 'cobe';
import { Application, Graphics } from 'pixi.js';
import gsap from 'gsap';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// 01 — COBE: prove we can reuse a dedicated globe instead of rebuilding one.
const globeCanvas = document.querySelector<HTMLCanvasElement>('#lab-globe');
if (globeCanvas) {
  let phi = 4.65;
  let width = 1;
  let height = 1;
  const dpr = Math.min(devicePixelRatio || 1, 1.4);
  const resize = () => {
    const r = globeCanvas.getBoundingClientRect();
    width = Math.max(1, r.width);
    height = Math.max(1, r.height);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(globeCanvas);
  const globe = createGlobe(globeCanvas, {
    devicePixelRatio: dpr,
    width: Math.round(width * dpr),
    height: Math.round(height * dpr),
    phi,
    theta: 0.2,
    dark: 1,
    diffuse: 1.15,
    scale: 1.06,
    mapSamples: 9000,
    mapBrightness: 7,
    baseColor: [0.02, 0.16, 0.42],
    markerColor: [0.88, 0.31, 0.22],
    glowColor: [0.04, 0.3, 0.7],
    markers: [
      { location: [19.4326, -99.1332], size: 0.08 },
      { location: [39.9042, 116.4074], size: 0.055 }
    ],
    onRender: (state) => {
      if (!reduceMotion) phi += 0.0013;
      state.phi = phi;
      state.width = Math.round(width * dpr);
      state.height = Math.round(height * dpr);
    }
  });
  addEventListener('pagehide', () => { ro.disconnect(); globe.destroy(); }, { once: true });
}

// 02 — PixiJS: dense 2D primitive field. No 3D scene required.
const pixiStage = document.querySelector<HTMLElement>('#pixi-stage');
if (pixiStage) {
  const app = new Application();
  await app.init({ resizeTo: pixiStage, background: '#000d2d', antialias: true, resolution: Math.min(devicePixelRatio || 1, 1.5), autoDensity: true });
  pixiStage.appendChild(app.canvas);

  const field = new Graphics();
  const draw = () => {
    field.clear();
    const w = app.renderer.width / app.renderer.resolution;
    const h = app.renderer.height / app.renderer.resolution;
    const cols = Math.max(10, Math.floor(w / 34));
    const rows = Math.max(8, Math.floor(h / 34));
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const px = (x + .5) * w / cols;
        const py = (y + .5) * h / rows;
        const n = (x * 17 + y * 31) % 13;
        if (n < 6) field.circle(px, py, n === 0 ? 3 : 1.7).fill(n === 0 ? 0xe14e38 : 0xfafafa);
        else if (n < 9) field.rect(px - 4, py - 4, 8, 8).stroke({ color: 0x0bb4d7, width: 1 });
        else if (n < 11) { field.moveTo(px - 6, py); field.lineTo(px + 6, py); field.stroke({ color: 0xfafafa, width: 1 }); }
        else { field.moveTo(px - 5, py); field.lineTo(px + 5, py); field.moveTo(px, py - 5); field.lineTo(px, py + 5); field.stroke({ color: 0xe14e38, width: 1.5 }); }
      }
    }
  };
  app.stage.addChild(field);
  draw();
  app.renderer.on('resize', draw);
  if (!reduceMotion) app.ticker.add((ticker) => { field.alpha = 0.84 + Math.sin(ticker.lastTime * 0.0012) * 0.12; });
  addEventListener('pagehide', () => app.destroy(true, { children: true }), { once: true });
}

// 03 — SVG + GSAP: state change without fake data-viz.
const frag = document.querySelector('#morph-fragmented');
const structured = document.querySelector('#morph-structured');
const morphButton = document.querySelector<HTMLButtonElement>('#morph-toggle');
let structuredOn = false;
morphButton?.addEventListener('click', () => {
  structuredOn = !structuredOn;
  const duration = reduceMotion ? 0 : 0.7;
  gsap.to(frag, { opacity: structuredOn ? 0 : 1, scale: structuredOn ? 0.94 : 1, transformOrigin: '50% 50%', duration, ease: 'power3.inOut' });
  gsap.to(structured, { opacity: structuredOn ? 1 : 0, scale: structuredOn ? 1 : 1.06, transformOrigin: '50% 50%', duration, ease: 'power3.inOut' });
});

// 04 — MapLibre: real geographic substrate for an operational story.
const mapNode = document.querySelector<HTMLElement>('#lab-map');
if (mapNode) {
  const map = new maplibregl.Map({
    container: mapNode,
    style: 'https://demotiles.maplibre.org/style.json',
    center: [-99.1332, 19.4326],
    zoom: 9.2,
    attributionControl: false
  });
  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
  map.on('load', () => {
    map.addSource('dixios-route', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{ type: 'Feature', properties: { demo: true }, geometry: { type: 'LineString', coordinates: [[-99.22,19.38],[-99.18,19.43],[-99.11,19.46],[-99.06,19.41]] } }]
      }
    });
    map.addLayer({ id: 'dixios-route', type: 'line', source: 'dixios-route', paint: { 'line-color': '#e14e38', 'line-width': 4, 'line-opacity': 0.9 } });
    [[-99.22,19.38],[-99.11,19.46],[-99.06,19.41]].forEach((lngLat, i) => {
      const el = document.createElement('div');
      el.style.cssText = `width:${i===1?14:10}px;height:${i===1?14:10}px;background:${i===1?'#e14e38':'#003f8f'};border:2px solid #fafafa`;
      new maplibregl.Marker({ element: el }).setLngLat(lngLat as [number, number]).addTo(map);
    });
  });
  addEventListener('pagehide', () => map.remove(), { once: true });
}

// 05 — Persistent object: same ID, explicit states.
const states = ['COMPRENDER','VERIFICAR','DEFINIR','DISEÑAR','DESARROLLAR','IMPLEMENTAR','OPERAR','MEDIR','CORREGIR'];
const word = document.querySelector<HTMLElement>('#state-word');
const bar = document.querySelector<HTMLElement>('.state-track i');
const next = document.querySelector<HTMLButtonElement>('#state-next');
let stateIndex = 0;
next?.addEventListener('click', () => {
  stateIndex = (stateIndex + 1) % states.length;
  if (!word || !bar) return;
  const duration = reduceMotion ? 0 : 0.28;
  gsap.to(word, { opacity: 0, y: -18, duration, ease: 'power2.in', onComplete: () => {
    word.textContent = states[stateIndex];
    gsap.fromTo(word, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: reduceMotion ? 0 : 0.42, ease: 'power3.out' });
  }});
  gsap.to(bar, { width: `${((stateIndex + 1) / states.length) * 100}%`, duration: reduceMotion ? 0 : 0.6, ease: 'power3.inOut' });
});
