import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const initialized = new WeakSet();

function shouldUseLive3D() {
  const isSmall = window.matchMedia('(max-width: 767px)').matches;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = Boolean(navigator.connection?.saveData);
  return !isSmall && !coarse && !reduce && !saveData;
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

function centerObject(object) {
  const box = new THREE.Box3().setFromObject(object);
  const center = box.getCenter(new THREE.Vector3());
  object.position.sub(center);
  object.updateMatrixWorld(true);
}

function frameObject(camera, object, container) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z, 1);
  const fov = THREE.MathUtils.degToRad(camera.fov);
  const distance = (maxDim * 0.64) / Math.tan(fov / 2);
  const aspectBias = container.clientWidth / Math.max(container.clientHeight, 1);

  camera.position.set(maxDim * 0.18, maxDim * 0.16, distance * (aspectBias > 1.3 ? 1.02 : 1.18));
  camera.lookAt(0, maxDim * 0.02, 0);
  camera.near = Math.max(distance / 100, 0.01);
  camera.far = distance * 12;
  camera.updateProjectionMatrix();

  return { maxDim };
}

function makeScene(container, canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: false
  });

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

  const hemi = new THREE.HemisphereLight(0x6da8ff, 0x010824, 2.2);
  const key = new THREE.DirectionalLight(0x6da8ff, 2.5);
  key.position.set(4, 8, 6);
  const rim = new THREE.DirectionalLight(0x0b4fd3, 3.2);
  rim.position.set(-6, 3, -4);
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

function tuneImportedScene(root) {
  root.traverse((node) => {
    if (!node.isMesh) return;
    node.castShadow = false;
    node.receiveShadow = false;

    const hadMaterialArray = Array.isArray(node.material);
    const materials = hadMaterialArray ? node.material : [node.material];
    const tunedMaterials = materials.map((material) => {
      const next = material.clone();
      if ('metalness' in next) next.metalness = Math.min(next.metalness ?? 0.2, 0.42);
      if ('roughness' in next) next.roughness = Math.max(next.roughness ?? 0.55, 0.42);
      if ('emissiveIntensity' in next && next.emissiveMap) next.emissiveIntensity = Math.max(next.emissiveIntensity || 0, 0.7);
      return next;
    });

    node.material = hadMaterialArray ? tunedMaterials : tunedMaterials[0];
  });
}

function disposeObject(root) {
  root.traverse((node) => {
    if (!node.isMesh) return;
    node.geometry?.dispose?.();
    const materials = Array.isArray(node.material) ? node.material : [node.material];
    for (const material of materials) {
      if (!material) continue;
      for (const value of Object.values(material)) {
        if (value?.isTexture) value.dispose();
      }
      material.dispose?.();
    }
  });
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

  let engine;
  try {
    engine = makeScene(container, canvas);
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
    const t = time * 0.00022;
    const drift = Math.sin(t) * maxDim * 0.008;
    camera.position.x = basePosition.x + pointerX * maxDim * 0.018 + drift;
    camera.position.y = basePosition.y - pointerY * maxDim * 0.008;
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
      const framed = frameObject(camera, root, container);
      maxDim = framed.maxDim;
      basePosition.copy(camera.position);
      baseLook.set(0, maxDim * 0.02, 0);
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
    root = gltf.scene;
    tuneImportedScene(root);
    scene.add(root);
    centerObject(root);
    const framed = frameObject(camera, root, container);
    maxDim = framed.maxDim;
    basePosition.copy(camera.position);
    baseLook.set(0, maxDim * 0.02, 0);
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
