import { prepareContact } from '../lib/contact.mjs';

const qa = new URLSearchParams(location.search).get('qa') === '1';
if (qa) document.documentElement.dataset.qa = 'true';

const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const navigation = document.querySelector<HTMLElement>('#main-navigation');
const setMenu = (open: boolean) => {
  toggle?.setAttribute('aria-expanded', String(open));
  navigation?.classList.toggle('is-open', open);
};
toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
navigation
  ?.querySelectorAll('a')
  .forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    toggle.focus();
  }
});
matchMedia('(min-width: 761px)').addEventListener('change', () => setMenu(false));

const form = document.querySelector<HTMLFormElement>('#contact-form');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const result = prepareContact(Object.fromEntries(new FormData(form)));
  const status = document.querySelector<HTMLElement>('#contact-status');
  if (!result.ok) {
    if (status) status.textContent = result.error ?? '';
    return;
  }
  if (status)
    status.textContent =
      'Tu borrador está listo. Completa el envío en tu aplicación de correo. Si no se abre, escribe a contacto@dixios.com.';
  if (result.url) window.location.href = result.url;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => entry.target.classList.toggle('in-view', entry.isIntersecting));
  },
  { rootMargin: '60px', threshold: 0 },
);
document.querySelectorAll('section').forEach((section) => observer.observe(section));
