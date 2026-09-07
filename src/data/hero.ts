export const hero = {
  brand: 'dixios',
  claim: 'El encuentro de la tecnología con lo humano',
  description:
    'Dixios es una firma de inteligencia, transformación y tecnología institucional. Convertimos problemas públicos complejos en sistemas funcionales de decisión y ejecución.',
  cta: {
    label: 'Conoce cómo trabajamos',
    href: '#servicios'
  },
  nav: [
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Publicaciones', href: '#publicaciones' },
    { label: 'Contacto', href: '#contacto' }
  ],
  labels: [
    { label: 'INSTITUCIONES', className: 'hero-label--instituciones' },
    { label: 'DATOS', className: 'hero-label--datos' },
    { label: 'PERSONAS', className: 'hero-label--personas' },
    { label: 'RESULTADOS', className: 'hero-label--resultados' }
  ]
} as const;
