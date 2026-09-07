import type { APIRoute, MarkdownInstance } from 'astro';

const articles = import.meta.glob<MarkdownInstance<{ published?: boolean }>>(
  './publicaciones/*.md',
  { eager: true },
);
// Empty pages stay out; an author's published flag adds the finished article automatically.
export const GET: APIRoute = ({ site }) => {
  const home = new URL(import.meta.env.BASE_URL, site);
  const urls = [
    home.href,
    ...Object.entries(articles)
      .filter(([, article]) => article.frontmatter.published === true)
      .map(([file]) => new URL(`${import.meta.env.BASE_URL}${file.slice(2, -3)}/`, site).href),
  ];
  const entries = urls
    .map((url) => `<url><loc>${url.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</loc></url>`)
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
