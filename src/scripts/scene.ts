import * as THREE from 'three';

type Quality = 'high' | 'medium' | 'low';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas = document.querySelector<HTMLCanvasElement>('#hero-webgl');

if (canvas) {
  const isMobile = matchMedia('(max-width: 760px)').matches;
  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4;
  let quality: Quality = isMobile || cores <= 4 || memory <= 4 ? 'low' : cores <= 8 ? 'medium' : 'high';

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: 'high-performance'
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const uniforms = {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uPointer: { value: new THREE.Vector2(0.5, 0.5) },
    uScroll: { value: 0 },
    uIntensity: { value: 1 }
  };

  const vertexShader = /* glsl */`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `;

  const fragmentShader = /* glsl */`
    precision highp float;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uPointer;
    uniform float uScroll;
    uniform float uIntensity;

    float hash21(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    float line(float d, float w) {
      return 1.0 - smoothstep(w, w + 0.0025, abs(d));
    }

    mat2 rot(float a) {
      float s = sin(a), c = cos(a);
      return mat2(c, -s, s, c);
    }

    void main() {
      vec2 uv = vUv;
      vec2 p = uv - 0.5;
      p.x *= uResolution.x / max(uResolution.y, 1.0);

      vec2 mp = uPointer - 0.5;
      mp.x *= uResolution.x / max(uResolution.y, 1.0);
      float t = uTime * 0.14;

      vec3 night = vec3(0.0, 0.025, 0.13);
      vec3 blue = vec3(0.0, 0.247, 0.56);
      vec3 electric = vec3(0.055, 0.294, 0.631);
      vec3 cyan = vec3(0.043, 0.706, 0.843);
      vec3 magenta = vec3(0.776, 0.337, 0.667);
      vec3 coral = vec3(0.882, 0.306, 0.22);

      vec3 color = mix(night, blue * 0.72, smoothstep(0.9, -0.25, length(p)));

      vec2 q = p;
      q += 0.035 * vec2(
        sin(q.y * 8.0 + t * 3.0),
        cos(q.x * 7.0 - t * 2.0)
      );
      q += (mp - p) * 0.035 / (0.25 + dot(mp - p, mp - p));

      // Institutional coordinate grid.
      vec2 gridUv = q * 7.0;
      vec2 grid = abs(fract(gridUv - 0.5) - 0.5) / fwidth(gridUv);
      float gridLine = 1.0 - min(min(grid.x, grid.y), 1.0);
      color += electric * gridLine * 0.075;

      // Concentric decision field.
      vec2 center = vec2(0.28, 0.02);
      float r = length(q - center);
      float rings = line(fract(r * 4.8 - t * 0.45) - 0.5, 0.035);
      rings *= smoothstep(1.0, 0.05, r);
      color += cyan * rings * 0.20;

      // Rotating routing lines.
      vec2 rp = (q - center) * rot(-0.12 - uScroll * 0.28);
      float beamA = line(rp.y - sin(rp.x * 2.7 + t) * 0.05, 0.008);
      float beamB = line(rp.y + 0.25 - cos(rp.x * 3.1 - t * 0.8) * 0.04, 0.004);
      color += cyan * beamA * 0.33;
      color += magenta * beamB * 0.20;

      // Pixel/data field. Stable cells with sparse activity.
      vec2 cells = floor((q + vec2(1.4, 0.95)) * 20.0);
      vec2 local = fract((q + vec2(1.4, 0.95)) * 20.0) - 0.5;
      float rnd = hash21(cells);
      float dotShape = 1.0 - smoothstep(0.08, 0.15, length(local));
      float active = step(0.82, rnd) * dotShape;
      vec3 dataColor = mix(cyan, magenta, step(0.93, rnd));
      color += dataColor * active * 0.46 * smoothstep(1.1, 0.15, length(q));

      // Coral anomaly / decision point.
      vec2 anomaly = q - vec2(0.56, -0.22);
      float crossA = line(anomaly.x, 0.006) * smoothstep(0.095, 0.07, abs(anomaly.y));
      float crossB = line(anomaly.y, 0.006) * smoothstep(0.095, 0.07, abs(anomaly.x));
      color += coral * (crossA + crossB) * (0.7 + 0.3 * sin(uTime * 1.4));

      // Soft depth and scan illumination.
      float glow = exp(-5.5 * length(q - center));
      color += cyan * glow * 0.17;
      float scan = exp(-80.0 * abs(uv.y - fract(t * 0.07 + uScroll * 0.28)));
      color += vec3(0.18, 0.48, 0.72) * scan * 0.065;

      float vignette = smoothstep(0.95, 0.28, length(p * vec2(0.78, 1.0)));
      color *= 0.72 + vignette * 0.36;

      float grain = hash21(gl_FragCoord.xy + floor(uTime * 24.0));
      color += (grain - 0.5) * 0.025;
      color *= uIntensity;

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    depthWrite: false,
    depthTest: false
  });

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  scene.add(mesh);

  let raf = 0;
  let running = true;
  let last = performance.now();
  let frames = 0;
  let sampleStart = last;
  const targetPointer = new THREE.Vector2(0.5, 0.5);

  const qualityScale = () => quality === 'high' ? 1.0 : quality === 'medium' ? 0.82 : 0.62;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const maxPixels = isMobile ? 900_000 : quality === 'high' ? 2_200_000 : 1_500_000;
    const nativeDpr = Math.min(window.devicePixelRatio || 1, quality === 'high' ? 1.6 : 1.25);
    const desired = rect.width * rect.height * nativeDpr * nativeDpr;
    const scale = desired > maxPixels ? Math.sqrt(maxPixels / desired) : 1;
    const dpr = Math.max(0.65, nativeDpr * scale * qualityScale());
    renderer.setPixelRatio(dpr);
    renderer.setSize(rect.width, rect.height, false);
    uniforms.uResolution.value.set(rect.width * dpr, rect.height * dpr);
  };

  const render = (now: number) => {
    if (!running) return;
    const dt = Math.min(32, now - last);
    last = now;
    if (!reduceMotion) uniforms.uTime.value += dt * 0.001;
    uniforms.uPointer.value.lerp(targetPointer, reduceMotion ? 1 : 0.055);
    renderer.render(scene, camera);

    frames++;
    if (!reduceMotion && now - sampleStart > 2600) {
      const fps = frames * 1000 / (now - sampleStart);
      if (fps < 43 && quality !== 'low') {
        quality = quality === 'high' ? 'medium' : 'low';
        resize();
      }
      frames = 0;
      sampleStart = now;
    }

    if (!reduceMotion) raf = requestAnimationFrame(render);
  };

  const start = () => {
    if (running) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(render);
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  resize();
  renderer.render(scene, camera);
  if (!reduceMotion) raf = requestAnimationFrame(render);

  canvas.addEventListener('pointermove', (event) => {
    const rect = canvas.getBoundingClientRect();
    targetPointer.set(
      THREE.MathUtils.clamp((event.clientX - rect.left) / rect.width, 0, 1),
      THREE.MathUtils.clamp(1 - (event.clientY - rect.top) / rect.height, 0, 1)
    );
  }, { passive: true });

  canvas.addEventListener('pointerleave', () => targetPointer.set(0.5, 0.5), { passive: true });
  addEventListener('resize', resize, { passive: true });

  const io = new IntersectionObserver(([entry]) => entry.isIntersecting ? start() : stop(), { threshold: 0.01 });
  io.observe(canvas);

  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());

  window.addEventListener('dixios:hero-scroll', ((event: CustomEvent<number>) => {
    uniforms.uScroll.value = event.detail;
  }) as EventListener);

  window.addEventListener('pagehide', () => {
    stop();
    io.disconnect();
    material.dispose();
    mesh.geometry.dispose();
    renderer.dispose();
  }, { once: true });
}
