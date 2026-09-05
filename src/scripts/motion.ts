import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const canvas = document.querySelector<HTMLCanvasElement>('#dixios-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d', { alpha: true });
  if (ctx) {
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    let pointerX = -9999;
    let pointerY = -9999;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    type Particle = { x:number; y:number; size:number; kind:number; phase:number; speed:number; color:string };
    let particles: Particle[] = [];

    const palette = ['#ffffff', '#e14e38', '#0bb4d7', '#c656aa'];

    const seed = () => {
      const count = Math.min(150, Math.max(72, Math.round((w * h) / 12000)));
      particles = Array.from({ length: count }, (_, i) => {
        const edgeBias = Math.random() < .62;
        const side = i % 4;
        let x = Math.random() * w;
        let y = Math.random() * h;
        if (edgeBias) {
          if (side === 0) y = Math.random() * h * .25;
          if (side === 1) x = w * (.75 + Math.random() * .25);
          if (side === 2) y = h * (.75 + Math.random() * .25);
          if (side === 3) x = Math.random() * w * .25;
        }
        return {
          x, y,
          size: 2 + Math.random() * 5,
          kind: i % 5,
          phase: Math.random() * Math.PI * 2,
          speed: .12 + Math.random() * .35,
          color: palette[i % palette.length]
        };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const drawPrimitive = (p: Particle, t:number) => {
      const drift = reduceMotion ? 0 : Math.sin(t * p.speed + p.phase) * 7;
      const x = p.x + drift;
      const y = p.y + Math.cos(t * p.speed * .7 + p.phase) * (reduceMotion ? 0 : 5);
      const dx = x - pointerX;
      const dy = y - pointerY;
      const dist = Math.hypot(dx, dy);
      const push = !reduceMotion && dist < 120 ? (120 - dist) / 120 * 16 : 0;
      const px = x + (dist ? dx / dist : 0) * push;
      const py = y + (dist ? dy / dist : 0) * push;

      ctx.strokeStyle = p.color;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.color === '#ffffff' ? .66 : .72;
      ctx.lineWidth = 1.2;

      if (p.kind === 0) {
        ctx.beginPath(); ctx.arc(px, py, p.size, 0, Math.PI * 2); ctx.fill();
      } else if (p.kind === 1) {
        ctx.fillRect(px - p.size, py - p.size, p.size * 2, p.size * 2);
      } else if (p.kind === 2) {
        ctx.beginPath(); ctx.moveTo(px - 7, py); ctx.lineTo(px + 7, py); ctx.moveTo(px, py - 7); ctx.lineTo(px, py + 7); ctx.stroke();
      } else if (p.kind === 3) {
        for (let k = 0; k < 4; k++) ctx.fillRect(px - 15, py + k * 4 - 7, 30, 1);
      } else {
        for (let gx = 0; gx < 3; gx++) for (let gy = 0; gy < 3; gy++) ctx.fillRect(px + gx * 5 - 5, py + gy * 5 - 5, 2, 2);
      }
      ctx.globalAlpha = 1;
    };

    const render = (ms = 0) => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      const t = ms * .001;
      for (const p of particles) drawPrimitive(p, t);
      raf = requestAnimationFrame(render);
    };

    resize();
    render();
    addEventListener('resize', resize, { passive: true });
    canvas.addEventListener('pointermove', (e) => { pointerX = e.clientX; pointerY = e.clientY; }, { passive: true });
    canvas.addEventListener('pointerleave', () => { pointerX = -9999; pointerY = -9999; }, { passive: true });

    const observer = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
      if (running && !raf) render();
      if (!running) { cancelAnimationFrame(raf); raf = 0; }
    }, { threshold: .02 });
    observer.observe(canvas);
  }
}

if (!reduceMotion) {
  gsap.from('.hero-eyebrow', { y: 16, opacity: 0, duration: .9, delay: .2, ease: 'power3.out' });
  gsap.from('.hero-logo', { scale: .94, opacity: 0, duration: 1.25, delay: .08, ease: 'power4.out' });
  gsap.from('.hero-tagline', { y: 30, opacity: 0, duration: 1, delay: .48, ease: 'power3.out' });
  gsap.from('.hero-meta span', { y: 10, opacity: 0, duration: .7, stagger: .06, delay: .76, ease: 'power2.out' });

  gsap.to('.hero-center', {
    yPercent: 14,
    opacity: .1,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  const vizTimeline = gsap.timeline({
    scrollTrigger: { trigger: '.reveal', start: 'top 70%', end: 'bottom 58%', scrub: 1 }
  });
  vizTimeline
    .from('.system-viz .node', { x: () => gsap.utils.random(-90, 90), y: () => gsap.utils.random(-80, 80), opacity: .15, stagger: .03 }, 0)
    .from('.system-viz .link', { scaleX: 0, opacity: 0, stagger: .06 }, .18)
    .from('.viz-label', { y: 14, opacity: 0, stagger: .08 }, .28);

  gsap.utils.toArray<HTMLElement>('.cap-item').forEach((item, i) => {
    gsap.from(item, {
      y: 30,
      opacity: 0,
      duration: .8,
      delay: i * .03,
      ease: 'power3.out',
      scrollTrigger: { trigger: item, start: 'top 88%', once: true }
    });
  });

  const steps = gsap.utils.toArray<HTMLElement>('.step');
  ScrollTrigger.create({
    trigger: '.process',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
      steps.forEach((s, i) => s.classList.toggle('active', i <= idx));
    }
  });

  gsap.from('.command-grid .panel', {
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: .14,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.command-grid', start: 'top 82%', once: true }
  });
}

const form = document.querySelector<HTMLFormElement>('#contact-form');
const note = document.querySelector<HTMLElement>('#form-note');
if (form && note) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const nombre = String(data.get('nombre') || '');
    const email = String(data.get('email') || '');
    const telefono = String(data.get('telefono') || '');
    const mensaje = String(data.get('mensaje') || '');
    const subject = encodeURIComponent(`Contacto web Dixios — ${nombre}`);
    const body = encodeURIComponent(`Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\n\n${mensaje}`);
    note.textContent = 'Mensaje preparado. Falta confirmar el buzón oficial de Dixios para activar el envío directo.';
    navigator.clipboard?.writeText(`Asunto: Contacto web Dixios — ${nombre}\n\nNombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\n\n${mensaje}`).catch(() => {});
    form.dataset.subject = subject;
    form.dataset.body = body;
  });
}
