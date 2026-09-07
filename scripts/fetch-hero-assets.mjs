import { mkdir, readFile, writeFile, unlink } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const asset = {
  url: 'https://raw.githubusercontent.com/sceneview/sceneview/2056ddd0fd76de38b69f590589894ff966d97a83/assets/models/glb/night_city.glb',
  output: resolve('public/assets/hero/night-city.glb'),
  minBytes: 1_000_000,
  maxBytes: 8_000_000
};

async function isValidGlb(path) {
  try {
    const data = await readFile(path);
    return data.length >= asset.minBytes && data.length <= asset.maxBytes && data.subarray(0, 4).toString('ascii') === 'glTF';
  } catch {
    return false;
  }
}

if (await isValidGlb(asset.output)) {
  console.log('[assets] Hero city already present and valid.');
  process.exit(0);
}

try {
  await mkdir(dirname(asset.output), { recursive: true });
  const response = await fetch(asset.url, { redirect: 'follow' });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < asset.minBytes || bytes.length > asset.maxBytes || bytes.subarray(0, 4).toString('ascii') !== 'glTF') {
    throw new Error(`Unexpected GLB payload (${bytes.length} bytes)`);
  }
  await writeFile(asset.output, bytes);
  console.log(`[assets] Downloaded hero city (${(bytes.length / 1024 / 1024).toFixed(2)} MiB).`);
} catch (error) {
  await unlink(asset.output).catch(() => {});
  console.warn('[assets] Hero city download failed; build continues with SVG fallback and runtime remote fallback.');
  console.warn(error instanceof Error ? error.message : error);
}
