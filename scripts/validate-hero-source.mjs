import { readFile } from 'node:fs/promises';

const required = [
  ['src/data/hero.ts', 'El encuentro de la tecnología con lo humano'],
  ['src/data/hero.ts', 'Dixios es una firma de inteligencia, transformación y tecnología institucional.'],
  ['src/components/hero/CityScene.astro', 'Quaternius · CC0'],
  ['src/components/hero/CityScene.astro', 'city-fallback.svg'],
  ['src/styles/hero.css', '@media (max-width: 767px)'],
  ['src/scripts/hero-city.js', 'prefers-reduced-motion: reduce'],
  ['src/scripts/hero-city.js', 'IntersectionObserver'],
  ['src/scripts/hero-city.js', 'webglcontextlost']
];

for (const [path, needle] of required) {
  const text = await readFile(path, 'utf8');
  if (!text.includes(needle)) throw new Error(`${path} is missing required contract: ${needle}`);
}

console.log(`[hero-check] ${required.length} source contracts passed.`);
