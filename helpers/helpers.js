import { nanoid } from 'nanoid';

export const getId = nanoid;

export const HTTP_STATUS = {
  ok: 200,
  created: 201,
  badRequest: 400,
  notFound: 404,
  alreadyExists: 409,
  invalidData: 422,
};

export const formatName = v => (v ? String(v).replace(/\s*/, ' ').trim() : '');

export const formatEmail = v => (v ? String(v).trim() : '');

export const formatPhone = v =>
  v
    ? String(v)
        .replace(/[\s-]/g, '')
        .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
    : '';
