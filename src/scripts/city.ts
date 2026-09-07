import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const families = ['a', 'd', 'f', 'i', 'k'] as const;
// Deliberate skyline: taller central/back district, open crossroads, low foreground.
const heights = [
  [2.1, 3.7, 5.4, 3.1, 4.6, 2.6],
  [3.3, 6.6, 4.8, 10.8, 5.5, 3.2],
  [2.7, 5.2, 7.1, 4.3, 6.1, 2.7],
  [1.5, 3.7, 4.1, 2.3, 3.2, 1.7],
  [1.1, 1.8, 1.3, 2.2, 1.5, 1.1],
];

function buildingMaterial() {
  const material = new THREE.MeshStandardMaterial({
    color: '#155bb5',
    roughness: 0.72,
    metalness: 0,
  });
  // Procedural facade light is part of each existing mesh, never separate window objects.
  material.onBeforeCompile = (shader) => {
    shader.vertexShader =
      'varying vec3 cityPosition; varying vec3 cityNormal;\n' + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      '#include <begin_vertex>\ncityPosition = position; cityNormal = normal;',
    );
    shader.fragmentShader =
      'varying vec3 cityPosition; varying vec3 cityNormal;\n' + shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <emissivemap_fragment>',
      `
      #include <emissivemap_fragment>
      float horizontal = abs(cityNormal.x) > .5 ? cityPosition.z : cityPosition.x;
      vec2 grid = vec2(horizontal * 10.0, cityPosition.y * 6.0);
      vec2 cell = fract(grid);
      float seed = fract(sin(dot(floor(grid), vec2(41.23, 17.89))) * 43758.5453);
      float windows = step(.37, cell.x) * step(cell.x, .60) * step(.22, cell.y) * step(cell.y, .54);
      windows *= step(.64, seed) * (1.0 - step(.2, abs(cityNormal.y))) * step(.10, cityPosition.y);
      totalEmissiveRadiance += vec3(.01, .30, .9) * windows * .85;
    `,
    );
  };
  return material;
}

function addRoads(scene: THREE.Scene) {
  const streets = new THREE.Group();
  const roadMaterial = new THREE.MeshBasicMaterial({
    color: '#075ace',
    transparent: true,
    opacity: 0.38,
    depthWrite: false,
  });
  const stripeMaterial = new THREE.MeshBasicMaterial({
    color: '#1bc7ff',
    transparent: true,
    opacity: 0.78,
    depthWrite: false,
  });
  for (let i = 0; i < 7; i++) {
    for (const rotate of [false, true]) {
      const offset = (rotate ? -10.2 : -8.5) + i * 3.4;
      const road = new THREE.Mesh(new THREE.PlaneGeometry(26, 0.36), roadMaterial);
      road.rotation.x = -Math.PI / 2;
      road.rotation.z = rotate ? Math.PI / 2 : 0;
      road.position.set(rotate ? offset : 0, 0.018, rotate ? 0 : offset);
      streets.add(road);
      for (const edge of [-0.16, 0.16]) {
        const stripe = new THREE.Mesh(new THREE.PlaneGeometry(26, 0.018), stripeMaterial);
        stripe.rotation.copy(road.rotation);
        stripe.position.set(rotate ? offset + edge : 0, 0.025, rotate ? 0 : offset + edge);
        streets.add(stripe);
      }
    }
  }
  for (const rotate of [false, true]) {
    for (const [width, opacity] of [
      [0.3, 0.16],
      [0.085, 1],
    ]) {
      const artery = new THREE.Mesh(
        new THREE.PlaneGeometry(26, width),
        new THREE.MeshBasicMaterial({
          color: '#45d9ff',
          transparent: true,
          opacity,
          depthWrite: false,
        }),
      );
      artery.rotation.x = -Math.PI / 2;
      artery.rotation.z = rotate ? Math.PI / 2 : 0;
      artery.position.set(0, 0.035, rotate ? 0 : 1.7);
      streets.add(artery);
    }
  }
  const lightPool = new THREE.Mesh(
    new THREE.PlaneGeometry(29, 24),
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      vertexShader:
        'varying vec2 coord; void main(){coord=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader:
        'varying vec2 coord; void main(){float falloff=pow(max(0.,1.-length((coord-.5)*2.)),2.);gl_FragColor=vec4(.005,.14,.65,falloff*.4);}',
    }),
  );
  lightPool.rotation.x = -Math.PI / 2;
  lightPool.position.y = -0.02;
  streets.add(lightPool);
  scene.add(streets);
  return streets;
}

function addBuildings(scene: THREE.Scene, models: THREE.Group[]) {
  const material = buildingMaterial();
  const platformGeometry = new THREE.BoxGeometry(2.55, 0.11, 2.55);
  const platformMaterial = new THREE.MeshStandardMaterial({ color: '#05317d', roughness: 0.9 });
  const district = new THREE.Group();
  heights.forEach((row, z) =>
    row.forEach((height, x) => {
      const source = models[(x + z * 3) % models.length]!;
      const building = source.clone(true);
      building.traverse((object) => {
        if (object instanceof THREE.Mesh) object.material = material;
      });
      const bounds = new THREE.Box3().setFromObject(building);
      const size = bounds.getSize(new THREE.Vector3());
      building.scale.set(1.55 / size.x, height / size.y, 1.55 / size.z);
      building.position.set((x - 2.5) * 3.4, 0.12, (z - 2) * 3.4);
      const base = new THREE.Mesh(platformGeometry, platformMaterial);
      base.position.set(building.position.x, 0.055, building.position.z);
      building.userData.mobileCull = base.userData.mobileCull = (x === 0 || x === 5) && z > 1;
      district.add(base, building);
    }),
  );
  scene.add(district);
  return district;
}

function addSignals(scene: THREE.Scene) {
  const material = new THREE.MeshBasicMaterial({ color: '#65e9ff' });
  const geometry = new THREE.BoxGeometry(0.07, 0.04, 0.46);
  return Array.from({ length: 6 }, (_, i) => {
    const signal = new THREE.Mesh(geometry, material);
    signal.position.set(-6.8 + (i % 4) * 3.4, 0.05, -10 + i * 3);
    scene.add(signal);
    return signal;
  });
}

export async function mountCity(container: HTMLElement) {
  const params = new URLSearchParams(location.search);
  if (params.get('webgl') === 'off') {
    container.dataset.cityState = 'fallback';
    return;
  }
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
  } catch {
    container.dataset.cityState = 'fallback';
    return;
  }
  const mobileQuery = matchMedia('(max-width: 767px)');
  const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
  const qa = params.get('qa') === '1';
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-15, 15, 12, -12, 0.1, 100);
  camera.position.set(22, 14, 27);
  camera.lookAt(0, 2.4, 0);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  container.append(renderer.domElement);
  scene.add(new THREE.AmbientLight('#ffffff', 0.8));
  const key = new THREE.DirectionalLight('#ffffff', 3.2);
  key.position.set(-8, 18, 8);
  scene.add(key);
  const rim = new THREE.DirectionalLight('#2264ff', 0.85);
  rim.position.set(10, 5, -8);
  scene.add(rim);
  let disposed = false;
  let failed = false;
  let visible = true;
  let frame = 0;
  let lastRender = 0;
  let district: THREE.Group | undefined;
  let signals: THREE.Mesh[] = [];
  const fallback = () => {
    failed = true;
    cancelAnimationFrame(frame);
    container.dataset.cityState = 'fallback';
    renderer.domElement.style.opacity = '0';
  };
  const resize = () => {
    if (disposed || failed) return;
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    const aspect = width / height;
    district?.children.forEach((object) => {
      object.visible = !mobileQuery.matches || !object.userData.mobileCull;
    });
    signals.forEach((signal, i) => {
      signal.visible = !mobileQuery.matches || i < 3;
    });
    if (district)
      container.dataset.cityBuildings = String(
        district.children.filter((object) => object.visible).length / 2,
      );
    container.dataset.citySignals = String(signals.filter((signal) => signal.visible).length);
    const span = mobileQuery.matches ? 20 : 18.5;
    camera.left = (-span * aspect) / 2;
    camera.right = (span * aspect) / 2;
    camera.top = span / 2;
    camera.bottom = -span / 2;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(devicePixelRatio, mobileQuery.matches ? 1 : 1.5));
    renderer.setSize(width, height, false);
    renderer.render(scene, camera);
  };
  const render = (time: number) => {
    if (disposed || failed) return;
    if (visible && !document.hidden && time - lastRender > (mobileQuery.matches ? 65 : 32)) {
      signals.forEach((signal, i) => {
        signal.position.z = ((time * 0.0007 + i * 3.7) % 24) - 12;
      });
      renderer.render(scene, camera);
      lastRender = time;
    }
    if (!motionQuery.matches && !qa && visible && !document.hidden)
      frame = requestAnimationFrame(render);
  };
  const resume = () => {
    cancelAnimationFrame(frame);
    if (disposed || failed) return;
    renderer.render(scene, camera);
    if (!motionQuery.matches && !qa && visible && !document.hidden)
      frame = requestAnimationFrame(render);
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = !!entry?.isIntersecting;
    resume();
  });
  const resizer = new ResizeObserver(resize);
  observer.observe(container);
  resizer.observe(container);
  renderer.domElement.addEventListener('webglcontextlost', fallback);
  motionQuery.addEventListener('change', resume);
  mobileQuery.addEventListener('change', resize);
  document.addEventListener('visibilitychange', resume);
  const dispose = () => {
    disposed = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    resizer.disconnect();
    motionQuery.removeEventListener('change', resume);
    mobileQuery.removeEventListener('change', resize);
    document.removeEventListener('visibilitychange', resume);
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        geometries.add(object.geometry);
        (Array.isArray(object.material) ? object.material : [object.material]).forEach((m) =>
          materials.add(m),
        );
      }
    });
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
    renderer.dispose();
  };
  window.addEventListener('pagehide', (event) => {
    if (!event.persisted) dispose();
  });
  try {
    const loader = new GLTFLoader();
    const base = container.dataset.base || '/';
    const models = await Promise.all(
      families.map(async (family) => {
        const gltf = await loader.loadAsync(`${base}assets/city/low-detail-building-${family}.glb`);
        return gltf.scene;
      }),
    );
    if (disposed || failed) return;
    district = addBuildings(scene, models);
    addRoads(scene);
    signals = addSignals(scene);
    container.dataset.cityBuildings = String(district.children.length / 2);
    resize();
    container.dataset.cityState = 'ready';
    resume();
  } catch {
    fallback();
  }
}
