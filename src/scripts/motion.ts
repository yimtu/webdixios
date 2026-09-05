import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const cursor = document.querySelector<HTMLElement>('.cursor-dot');
if (cursor && !reduceMotion && matchMedia('(pointer:fine)').matches) {
  let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y;
  addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; cursor.style.opacity = '1'; }, { passive:true });
  gsap.ticker.add(() => {
    x += (tx - x) * .18; y += (ty - y) * .18;
    cursor.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
  });
}

if (!reduceMotion) {
  const intro = gsap.timeline({ defaults:{ ease:'power4.out' } });
  intro
    .from('.hero-kicker', { y:18, opacity:0, duration:.8 }, .1)
    .from('.hero-word span', { yPercent:110, rotate:4, opacity:0, duration:1.25, stagger:.055 }, .15)
    .from('.hero-statement', { y:38, opacity:0, duration:1 }, .58)
    .from('.hero-note', { y:24, opacity:0, duration:.9 }, .72)
    .from('.hero-hud, .hero-axis, .scroll-entry', { opacity:0, duration:.8, stagger:.06 }, .9);

  gsap.to('.hero-word', {
    yPercent:22,
    scale:.92,
    opacity:.18,
    ease:'none',
    scrollTrigger:{ trigger:'.hero', start:'top top', end:'bottom top', scrub:true }
  });
  gsap.to('.hero-grid', {
    yPercent:12,
    ease:'none',
    scrollTrigger:{ trigger:'.hero', start:'top top', end:'bottom top', scrub:true }
  });
  ScrollTrigger.create({
    trigger:'.hero', start:'top top', end:'bottom top', scrub:true,
    onUpdate:self => window.dispatchEvent(new CustomEvent('dixios:hero-scroll',{ detail:self.progress }))
  });

  const storyTl = gsap.timeline({
    scrollTrigger:{ trigger:'.system-story', start:'top top', end:'bottom bottom', scrub:1 }
  });
  storyTl
    .from('.story-copy', { y:80, opacity:0, duration:.18 }, 0)
    .from('.institution-machine', { scale:.88, rotateX:8, opacity:0, transformPerspective:900, duration:.2 }, .03)
    .from('.m-node', { x:()=>gsap.utils.random(-180,180), y:()=>gsap.utils.random(-160,160), opacity:0, duration:.28, stagger:.018 }, .12)
    .from('[data-link]', { strokeDashoffset:220, opacity:0, duration:.32, stagger:.035 }, .21)
    .from('.machine-center', { scale:.25, opacity:0, duration:.22 }, .35)
    .to('.machine-center', { boxShadow:'0 0 0 44px rgba(0,63,143,.04),0 0 0 92px rgba(0,63,143,.025)', duration:.18 }, .52)
    .to('.m-node', { scale:1.08, duration:.12, stagger:.01 }, .58);

  document.querySelectorAll<HTMLElement>('[data-cap]').forEach((row, i) => {
    gsap.from(row.children, {
      y:32, opacity:0, duration:.85, stagger:.035, ease:'power3.out',
      scrollTrigger:{ trigger:row, start:'top 88%', once:true }
    });
    gsap.to(row.querySelector('.cap-glyph'), {
      x:i % 2 ? -10 : 10,
      ease:'none',
      scrollTrigger:{ trigger:row, start:'top bottom', end:'bottom top', scrub:true }
    });
  });

  const orbitSteps = gsap.utils.toArray<HTMLElement>('.orbit-step');
  const progress = document.querySelector<HTMLElement>('.process-progress i');
  ScrollTrigger.create({
    trigger:'.process-zone', start:'top top', end:'bottom bottom', scrub:true,
    onUpdate:self => {
      const idx = Math.min(orbitSteps.length - 1, Math.floor(self.progress * orbitSteps.length));
      orbitSteps.forEach((el,i)=>el.classList.toggle('active', i <= idx));
      if(progress) progress.style.width = `${self.progress*100}%`;
    }
  });
  gsap.to('.process-orbit', {
    rotate:16, ease:'none',
    scrollTrigger:{ trigger:'.process-zone', start:'top top', end:'bottom bottom', scrub:true }
  });
  gsap.to('.orbit-core', {
    rotate:-16, ease:'none',
    scrollTrigger:{ trigger:'.process-zone', start:'top top', end:'bottom bottom', scrub:true }
  });

  gsap.from('.ops-intro > *', {
    y:65, opacity:0, duration:1, stagger:.12, ease:'power3.out',
    scrollTrigger:{ trigger:'.ops-intro', start:'top 82%', once:true }
  });
  gsap.from('.console-grid > *', {
    y:70, opacity:0, scale:.975, duration:1, stagger:.1, ease:'power3.out',
    scrollTrigger:{ trigger:'.ops-console', start:'top 78%', once:true }
  });
  document.querySelectorAll<SVGPathElement>('.route').forEach(path => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    gsap.to(path, {
      strokeDashoffset:0, duration:1.5, ease:'power2.out',
      scrollTrigger:{ trigger:'.console-map', start:'top 78%', once:true }
    });
  });

  gsap.from('.manifesto-big', {
    y:80, opacity:0, duration:1.1, ease:'power3.out',
    scrollTrigger:{ trigger:'.manifesto', start:'top 76%', once:true }
  });
  gsap.to('.manifesto-word', {
    xPercent:-8, ease:'none',
    scrollTrigger:{ trigger:'.manifesto', start:'top bottom', end:'bottom top', scrub:true }
  });

  document.querySelectorAll<HTMLElement>('.publication').forEach((card,i)=>{
    gsap.from(card, {
      y:80 + i*20, opacity:0, duration:1, delay:i*.05, ease:'power3.out',
      scrollTrigger:{ trigger:card, start:'top 88%', once:true }
    });
    const orbit = card.querySelector('.pub-orbit');
    if(orbit) gsap.to(orbit,{ rotate:90, scale:1.08, ease:'none', scrollTrigger:{ trigger:card, start:'top bottom', end:'bottom top', scrub:true }});
  });

  gsap.from('.contact-title, .contact-form', {
    y:70, opacity:0, duration:1, stagger:.12, ease:'power3.out',
    scrollTrigger:{ trigger:'.contact-grid', start:'top 82%', once:true }
  });
}

const nodes = document.querySelectorAll<HTMLElement>('.m-node');
nodes.forEach(node => {
  node.addEventListener('pointerenter',()=>{
    if(reduceMotion) return;
    gsap.to(node,{ scale:1.35, duration:.25, ease:'power2.out' });
    gsap.to('.machine-center',{ scale:1.04, duration:.3, ease:'power2.out' });
  });
  node.addEventListener('pointerleave',()=>{
    if(reduceMotion) return;
    gsap.to(node,{ scale:1, duration:.25, ease:'power2.out' });
    gsap.to('.machine-center',{ scale:1, duration:.3, ease:'power2.out' });
  });
});

const form = document.querySelector<HTMLFormElement>('#contact-form');
const note = document.querySelector<HTMLElement>('#form-note');
if(form && note){
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const data = new FormData(form);
    const nombre = String(data.get('nombre')||'');
    const email = String(data.get('email')||'');
    const telefono = String(data.get('telefono')||'');
    const mensaje = String(data.get('mensaje')||'');
    const payload = `Contacto web Dixios\nNombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\n\n${mensaje}`;
    navigator.clipboard?.writeText(payload).catch(()=>{});
    note.textContent = 'Información preparada. Conectaremos el buzón oficial antes del lanzamiento.';
  });
}

ScrollTrigger.refresh();
