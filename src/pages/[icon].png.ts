import type { APIRoute } from 'astro';
import sharp from 'sharp';
import source from '../../public/favicon.svg?raw';

export function getStaticPaths() {
  return [
    { params: { icon: 'favicon' }, props: { size: 96 } },
    { params: { icon: 'apple-touch-icon' }, props: { size: 180 } },
  ];
}

// Raster variants are compiled from the existing vector; no runtime image service.
export const GET: APIRoute = async ({ props }) => {
  const png = await sharp(Buffer.from(source)).resize(props.size, props.size).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
