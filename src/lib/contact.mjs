/** Validate only approved contact fields; no submission or data persistence. */
export function prepareContact(values) {
  const name = String(values.name ?? '').trim();
  const email = String(values.email ?? '').trim();
  const phone = String(values.phone ?? '').trim();
  const topic = String(values.topic ?? '').trim();
  if (
    !name ||
    name.length > 120 ||
    !topic ||
    topic.length > 200 ||
    phone.length > 40 ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    [name, email, phone, topic].some((value) => /[\r\n]/.test(value))
  ) {
    return { ok: false, error: 'Revisa tu nombre, un email válido y el tema de tu consulta.' };
  }
  const body = `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone || 'No indicado'}\n\nTema: ${topic}`;
  return {
    ok: true,
    url: `mailto:contacto@dixios.com?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(body)}`,
  };
}
