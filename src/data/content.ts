export const navigation = [
  { label: 'Nosotros', id: 'nosotros' },
  { label: 'Servicios', id: 'servicios' },
  { label: 'Publicaciones', id: 'publicaciones' },
  { label: 'Contacto', id: 'contacto' },
] as const;

export const services = [
  {
    title: 'Desarrollo de sistemas',
    description: 'Plataformas, integraciones y soluciones a la medida.',
  },
  { title: 'Análisis y gestión de datos', description: 'Información para mejores decisiones.' },
  { title: 'Innovación pública', description: 'Nuevas formas de resolver lo público.' },
  { title: 'Consultoría', description: 'De la evidencia a la acción.' },
  { title: 'Capacitación', description: 'Instituciones que aprenden y se fortalecen.' },
] as const;

// Titles: docs/09. Dates/categories: approved reference image; no invented destinations.
export const publications = [
  {
    title: 'Educación universitaria y cambio tecnológico en México',
    category: 'Educación',
    date: '12 de marzo, 2024',
    iso: '2024-03-12',
  },
  {
    title: 'Manual de prompting para principiantes',
    category: 'Tecnología',
    date: '6 de marzo, 2024',
    iso: '2024-03-06',
  },
  {
    title: '¿Qué son las humanidades digitales?',
    category: 'Sociedad',
    date: '28 de febrero, 2024',
    iso: '2024-02-28',
  },
] as const;
