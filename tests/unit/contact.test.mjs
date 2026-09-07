import { test } from 'node:test';
import assert from 'node:assert/strict';
import { prepareContact } from '../../src/lib/contact.mjs';

test('creates an encoded email draft for the approved address', () => {
  const result = prepareContact({
    name: 'Ana Pérez',
    email: 'ana@example.com',
    phone: '+52 55 1234 5678',
    topic: 'Datos & educación',
  });
  assert.equal(result.ok, true);
  const url = new URL(result.url);
  assert.equal(url.pathname, 'contacto@dixios.com');
  assert.equal(url.searchParams.get('subject'), 'Datos & educación');
  assert.match(url.searchParams.get('body'), /Ana Pérez/);
});
test('rejects empty and whitespace-only required values', () => {
  for (const name of ['', '   '])
    assert.equal(prepareContact({ name, email: 'a@b.mx', phone: '', topic: 'Hola' }).ok, false);
});
test('rejects invalid email and header injection', () => {
  for (const email of ['invalid', 'a@b.mx\r\nBcc:x@y.mx'])
    assert.equal(prepareContact({ name: 'Ana', email, phone: '', topic: 'Hola' }).ok, false);
});
test('accepts an optional phone and rejects oversized fields', () => {
  assert.equal(prepareContact({ name: 'Ana', email: 'a@b.mx', phone: '', topic: 'Hola' }).ok, true);
  assert.equal(
    prepareContact({ name: 'a'.repeat(121), email: 'a@b.mx', phone: '', topic: 'Hola' }).ok,
    false,
  );
});
test('encodes rather than interprets markup and URL delimiters', () => {
  const r = prepareContact({ name: '<Ana>', email: 'a@b.mx', phone: '', topic: '¿A? & B # C' });
  assert.equal(new URL(r.url).searchParams.get('subject'), '¿A? & B # C');
  assert.equal(new URL(r.url).searchParams.has('bcc'), false);
});

test('rejects missing values, oversized email/phone/topic and multiline subject', () => {
  assert.equal(prepareContact({}).ok, false);
  const valid = { name: 'Ana', email: 'ana@example.com', phone: '', topic: 'Datos' };
  for (const change of [
    { topic: '' },
    { topic: 'x'.repeat(201) },
    { phone: '1'.repeat(41) },
    { email: `${'a'.repeat(250)}@example.com` },
    { topic: 'Datos\nBcc: a@b.mx' },
  ]) {
    assert.equal(prepareContact({ ...valid, ...change }).ok, false);
  }
  assert.equal(prepareContact({ name: 'Ana', email: 'ana@example.com', topic: 'Datos' }).ok, true);
});
