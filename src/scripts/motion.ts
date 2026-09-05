import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
  intro
    .from('.hero-copy .eyebrow', { y: 14, opacity: 0, duration: .7 }, .1)
    .from('.hero-copy h1', { y: 34, opacity: 0, duration: .95 }, .18)
    .from('.hero-deck', { y: 24, opacity: 0, duration: .8 }, .38)
    .from('.hero-link', { y: 18, opacity: 0, duration: .7 }, .52)
    .from('.globe-module, .chrome-signal, .ascii-legend, .hero-side-note', { opacity: 0, y: 12, duration: .65, stagger: .05 }, .56)
    .from('.hero-pixel-field i, .hero-lines i', { opacity: 0, scale: .5, duration: .5, stagger: .009 }, .5);

  gsap.to('.hero-copy', {
    yPercent: 12,
    opacity: .18,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.to('.hero-visual', {
    yPercent: 7,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  const systemTl = gsap.timeline({
    scrollTrigger: { trigger: '.system-transform', start: 'top 78%', once: true }
  });
  systemTl
    .from('.fragment-field .frag', { x: () => gsap.utils.random(-28, 28), y: () => gsap.utils.random(-20, 20), opacity: 0, duration: .55, stagger: .04 }, 0)
    .from('.fragment-field svg path', { strokeDasharray: 380, strokeDashoffset: 380, duration: .9, stagger: .08 }, .12)
    .from('.gate-plate', { scaleY: .5, opacity: 0, duration: .6 }, .34)
    .from('.transform-gate > span', { x: -12, opacity: 0, duration: .45, stagger: .06 }, .4)
    .from('.capacity-matrix i', { scale: .15, opacity: 0, duration: .36, stagger: .025 }, .58)
    .from('.capacity-rails i', { scaleX: 0, opacity: 0, duration: .45, stagger: .05 }, .67);

  gsap.utils.toArray<HTMLElement>('.cap-card').forEach((card, index) => {
    gsap.from(card, {
      y: 26,
      opacity: 0,
      duration: .72,
      delay: index * .035,
      ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 88%', once: true }
    });
    const art = card.querySelector('.cap-art');
    if (art) gsap.to(art, {
      y: index % 2 ? -8 : 8,
      ease: 'none',
      scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  const cycleSteps = gsap.utils.toArray<HTMLElement>('.cycle-step');
  const cycleProgress = document.querySelector<HTMLElement>('.cycle-progress i');
  ScrollTrigger.create({
    trigger: '.cycle-section',
    start: 'top 70%',
    end: 'bottom 35%',
    scrub: true,
    onUpdate(self) {
      const active = Math.min(cycleSteps.length - 1, Math.floor(self.progress * cycleSteps.length));
      cycleSteps.forEach((step, i) => step.style.opacity = i <= active ? '1' : '.42');
      if (cycleProgress) cycleProgress.style.background = `linear-gradient(90deg,#ff634c ${self.progress * 100}%,rgba(255,255,255,.3) ${self.progress * 100}%)`;
    }
  });
  gsap.from('.cycle-art', { scale: .88, opacity: 0, duration: .75, stagger: .08, ease: 'power2.out', scrollTrigger: { trigger: '.cycle-steps', start: 'top 82%', once: true } });

  gsap.from('.ops-product', { y: 34, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: '.ops-product', start: 'top 82%', once: true } });
  gsap.from('.map-markers i', { scale: 0, opacity: 0, duration: .5, stagger: .08, ease: 'back.out(1.8)', scrollTrigger: { trigger: '.mexico-map', start: 'top 80%', once: true } });

  gsap.from('.manifesto-grid > *', { y: 28, opacity: 0, duration: .75, stagger: .09, ease: 'power3.out', scrollTrigger: { trigger: '.manifesto', start: 'top 82%', once: true } });
  gsap.from('.pub-card, .pub-contact', { y: 26, opacity: 0, duration: .72, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: '.publication-row', start: 'top 86%', once: true } });
}

const layerButtons = [...document.querySelectorAll<HTMLButtonElement>('.ops-layers button')];
layerButtons.forEach(button => button.addEventListener('click', () => {
  layerButtons.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
}));

const form = document.querySelector<HTMLFormElement>('#contact-form');
const note = document.querySelector<HTMLElement>('#form-note');
if (form && note) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const payload = `Contacto web Dixios\nNombre: ${data.get('nombre') || ''}\nEmail: ${data.get('email') || ''}\nTeléfono: ${data.get('telefono') || ''}\n\n${data.get('mensaje') || ''}`;
    navigator.clipboard?.writeText(payload).catch(() => {});
    note.textContent = 'Información preparada. El buzón oficial se conecta antes del lanzamiento.';
  });
}

ScrollTrigger.refresh();
