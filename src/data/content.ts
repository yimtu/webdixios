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

// Approved titles/categories; article bodies are intentionally left for the author.
export const publications = [
  {
    title: 'Educación universitaria y cambio tecnológico en México',
    category: 'Educación',
    slug: 'educacion-universitaria-y-cambio-tecnologico-en-mexico',
  },
  {
    title: 'Manual de prompting para principiantes',
    category: 'Tecnología',
    slug: 'manual-de-prompting-para-principiantes',
  },
  {
    title: '¿Qué son las humanidades digitales?',
    category: 'Sociedad',
    slug: 'que-son-las-humanidades-digitales',
  },
] as const;
