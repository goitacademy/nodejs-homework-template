import { Schema, model } from 'mongoose';
import Joi from 'joi';

import { onSaveError } from './hooks.js';

// ============================================================

const phoneRegExp = /^[\d+(). -]{5,15}$/;

const contactSchema = new Schema({
  name: {
    type: String,
    min: 3,
    max: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    min: 5,
    max: 15,
    match: phoneRegExp,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

export const contactAddSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({ 'any.required': 'missing required NAME field' }),
  email: Joi.string()
    .email()
    .required()
    .messages({ 'any.required': 'missing required EMAIL field' }),
  phone: Joi.string().min(5).max(15).pattern(phoneRegExp).required().messages({
    'string.pattern.base': `PHONE must have only digits.`,
    'any.required': 'missing required PHONE field',
  }),
  favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string().min(5).max(15).pattern(phoneRegExp).messages({
    'string.pattern.base': `PHONE must have only digits.`,
  }),
  favorite: Joi.boolean(),
});

contactSchema.post('save', onSaveError);

const Contact = model('contact', contactSchema);

export default Contact;
