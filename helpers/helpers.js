import { nanoid } from 'nanoid';
import Joi from 'joi';

export const getId = nanoid;

export const contactDataScheme = Joi.object({
  name: Joi.string()
    .pattern(/^\s*[A-Z][a-z]+(\s*[A-Z][a-z]+)?\s*$/)
    .required(),

  phone: Joi.string()
    .pattern(/^([\s-]*\d[\s-]*){10}$/)
    .required(),

  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

export const formatPhone = v =>
  String(v)
    .replace(/[\s-]/g, '')
    .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

export const formatName = v => String(v).replace(/\s*/, ' ').trim();
