const initialized = new WeakSet();

function shouldUseLive3D() {
  const isSmall = window.matchMedia('(max-width: 767px)').matches;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = Boolean(navigator.connection?.saveData);
  return !isSmall && !coarse && !reduce && !saveData;
}

async function loadThree() {
  const [THREE, loaderModule] = await Promise.all([
    import('three'),
    import('three/addons/loaders/GLTFLoader.js')
  ]);
  return { THREE, GLTFLoader: loaderModule.GLTFLoader };
}

function loadGltf(loader, url) {
  return new Promise((resolve, reject) => loader.load(url, resolve, undefined, reject));
}

async function loadWithFallback(loader, localUrl, remoteUrl) {
  try {
    return await loadGltf(loader, localUrl);
  } catch (localError) {
    if (!remoteUrl) throw localError;
    return loadGltf(loader, remoteUrl);
  }
}

function tuneMaterial(material) {
  const next = material.clone();
  if ('metalness' in next) next.metalness = Math.min(next.metalness ?? 0.12, 0.3);
  if ('roughness' in next) next.roughness = Math.max(next.roughness ?? 0.58, 0.5);
  if ('emissiveIntensity' in next && next.emissiveMap) next.emissiveIntensity = Math.max(next.emissiveIntensity || 0, 0.5);
  return next;
}

function tuneImportedScene(root) {
  root.traverse((node) => {
    if (!node.isMesh) return;
    node.castShadow = false;
    node.receiveShadow = false;
    const isArray = Array.isArray(node.material);
    const materials = isArray ? node.material : [node.material];
    const tuned = materials.map(tuneMaterial);
    node.material = isArray ? tuned : tuned[0];
  });
}

function createCityCluster(THREE, source) {
  const names = ['brick_block', 'corner_block'];
  const templates = names
    .map((name) => source.getObjectByName(name) || source.getObjectByName(`${name}_lod`))
    .filter(Boolean);

  // If a future source is a complete authored city instead of the current block pack,
  // retain its authored composition rather than forcing the Dixios placement adapter.
  if (templates.length < 2) return source;

  source.updateMatrixWorld(true);
  const cluster = new THREE.Group();
  cluster.name = 'dixios_city_cluster';

  const placements = [];
  const columns = 7;
  const rows = 5;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if ((row === 2 && col === 3) || (row === 1 && col === 5) || (row === 3 && col === 1)) continue;
      const seed = row * columns + col;
      placements.push({
        template: templates[seed % templates.length],
        x: (col - (columns - 1) / 2) * 14 + ((row % 2) * 2.5),
        z: (row - (rows - 1) / 2) * 15,
        scale: 0.82 + ((seed * 17) % 7) * 0.055,
        rotation: ((seed * 13) % 4) * (Math.PI / 2)
      });
    }
  }

  for (const placement of placements) {
    const block = placement.template.clone(true);
    block.position.set(placement.x, 0, placement.z);
    block.rotation.y = placement.rotation;
    block.scale.setScalar(placement.scale);
    cluster.add(block);
  }

  tuneImportedScene(cluster);
  return cluster;
}

function centerObject(THREE, object) {
  object.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(object);
  const center = box.getCenter(new THREE.Vector3());
  object.position.sub(center);
  object.updateMatrixWorld(true);
}

function frameObject(THREE, camera, object, container) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z, 1);
  const fov = THREE.MathUtils.degToRad(camera.fov);
  const distance = (maxDim * 0.59) / Math.tan(fov / 2);
  const aspect = container.clientWidth / Math.max(container.clientHeight, 1);

  camera.position.set(maxDim * 0.34, maxDim * 0.30, distance * (aspect > 1.3 ? 0.88 : 1.05));
  camera.lookAt(0, -maxDim * 0.045, 0);
  camera.near = Math.max(distance / 120, 0.01);
  camera.far = distance * 12;
  camera.updateProjectionMatrix();
  return { maxDim };
}

function makeScene(THREE, container, canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: false
  });

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

  const hemi = new THREE.HemisphereLight(0x6da8ff, 0x010824, 2.4);
  const key = new THREE.DirectionalLight(0x6da8ff, 2.8);
  key.position.set(5, 10, 8);
  const rim = new THREE.DirectionalLight(0x0b4fd3, 3.4);
  rim.position.set(-8, 5, -6);
  scene.add(hemi, key, rim);

  const resize = () => {
    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  };
  resize();
  return { scene, camera, renderer, resize };
}

function disposeObject(root) {
  const materials = new Set();
  const geometries = new Set();
  const textures = new Set();
  root.traverse((node) => {
    if (!node.isMesh) return;
    if (node.geometry) geometries.add(node.geometry);
    const nodeMaterials = Array.isArray(node.material) ? node.material : [node.material];
    for (const material of nodeMaterials) {
      if (!material) continue;
      materials.add(material);
      for (const value of Object.values(material)) if (value?.isTexture) textures.add(value);
    }
  });
  textures.forEach((texture) => texture.dispose?.());
  materials.forEach((material) => material.dispose?.());
  geometries.forEach((geometry) => geometry.dispose?.());
}

async function initScene(container) {
  if (initialized.has(container)) return;
  initialized.add(container);

  if (!shouldUseLive3D()) {
    container.dataset.cityStatus = 'fallback';
    return;
  }

  const canvas = container.querySelector('canvas');
  if (!(canvas instanceof HTMLCanvasElement)) return;

  let THREE;
  let GLTFLoader;
  try {
    ({ THREE, GLTFLoader } = await loadThree());
  } catch (error) {
    console.warn('[Dixios hero] 3D runtime failed to load; keeping poster fallback.', error);
    container.dataset.cityStatus = 'fallback';
    return;
  }

  let engine;
  try {
    engine = makeScene(THREE, container, canvas);
  } catch (error) {
    console.warn('[Dixios hero] WebGL unavailable; keeping poster fallback.', error);
    container.dataset.cityStatus = 'fallback';
    return;
  }

  const { scene, camera, renderer, resize } = engine;
  const loader = new GLTFLoader();
  const localUrl = container.dataset.citySrc;
  const remoteUrl = container.dataset.cityRemoteSrc;
  let root;
  let maxDim = 10;
  let raf = 0;
  let active = true;
  let visible = true;
  let pointerX = 0;
  let pointerY = 0;
  const basePosition = new THREE.Vector3();
  const baseLook = new THREE.Vector3();

  const render = (time = 0) => {
    raf = 0;
    if (!active || !visible || !root) return;
    const t = time * 0.00018;
    const drift = Math.sin(t) * maxDim * 0.008;
    camera.position.x = basePosition.x + pointerX * maxDim * 0.016 + drift;
    camera.position.y = basePosition.y - pointerY * maxDim * 0.006;
    camera.lookAt(baseLook);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(render);
  };

  const start = () => {
    if (!raf && active && visible && root) raf = requestAnimationFrame(render);
  };
  const stop = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  };

  const onPointerMove = (event) => {
    const rect = container.getBoundingClientRect();
    pointerX = THREE.MathUtils.clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1);
    pointerY = THREE.MathUtils.clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1);
  };

  const onVisibility = () => {
    visible = !document.hidden;
    visible ? start() : stop();
  };

  const observer = new IntersectionObserver(([entry]) => {
    visible = Boolean(entry?.isIntersecting) && !document.hidden;
    visible ? start() : stop();
  }, { threshold: 0.01 });
  observer.observe(container);

  const resizeObserver = new ResizeObserver(() => {
    resize();
    if (root) {
      const framed = frameObject(THREE, camera, root, container);
      maxDim = framed.maxDim;
      basePosition.copy(camera.position);
      baseLook.set(0, -maxDim * 0.045, 0);
    }
  });
  resizeObserver.observe(container);

  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    stop();
    container.dataset.cityStatus = 'fallback';
  }, { passive: false });
  container.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);

  try {
    const gltf = await loadWithFallback(loader, localUrl, remoteUrl);
    if (!active) return;
    root = createCityCluster(THREE, gltf.scene);
    if (root === gltf.scene) tuneImportedScene(root);
    scene.add(root);
    centerObject(THREE, root);
    const framed = frameObject(THREE, camera, root, container);
    maxDim = framed.maxDim;
    basePosition.copy(camera.position);
    baseLook.set(0, -maxDim * 0.045, 0);
    resize();
    renderer.render(scene, camera);
    container.dataset.cityStatus = 'ready';
    start();
  } catch (error) {
    console.warn('[Dixios hero] 3D city failed to load; keeping poster fallback.', error);
    container.dataset.cityStatus = 'fallback';
  }

  const cleanup = () => {
    if (!active) return;
    active = false;
    stop();
    observer.disconnect();
    resizeObserver.disconnect();
    container.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('visibilitychange', onVisibility);
    if (root) {
      scene.remove(root);
      disposeObject(root);
    }
    renderer.dispose();
  };
  window.addEventListener('pagehide', cleanup, { once: true });
}

export function initHeroCityScenes() {
  document.querySelectorAll('[data-city-scene]').forEach((container) => {
    if (container instanceof HTMLElement) initScene(container);
  });
}
