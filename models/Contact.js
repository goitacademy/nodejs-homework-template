import { Schema, model } from 'mongoose';
import Joi from 'joi';

import { addUpdateSettings, onSaveError } from './hooks.js';

// ============================================================

const phoneRegExp = /^[\d+(). -]{5,15}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 30,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      minLength: 5,
      maxLength: 15,
      match: phoneRegExp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

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
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string().min(5).max(15).pattern(phoneRegExp).messages({
    'string.pattern.base': `PHONE must have only digits.`,
  }),
});

export const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

contactSchema.post('save', onSaveError);

contactSchema.pre('findOneAndUpdate', addUpdateSettings);

contactSchema.post('findOneAndUpdate', onSaveError);

const Contact = model('contact', contactSchema);

export default Contact;
