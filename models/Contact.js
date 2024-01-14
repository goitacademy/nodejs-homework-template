import { Schema, model } from 'mongoose';
import Joi from 'joi';

import { addUpdateSettings, onSaveError } from './hooks.js';

// ============================================================

const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
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
      match: emailRegExp,
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false }
);

contactSchema.post('save', onSaveError);
contactSchema.pre('findOneAndUpdate', addUpdateSettings);
contactSchema.post('findOneAndUpdate', onSaveError);

export const contactAddSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({ 'any.required': 'missing required NAME field' }),
  email: Joi.string()
    .pattern(emailRegExp)
    .required()
    .messages({ 'any.required': 'missing required EMAIL field' }),
  phone: Joi.string().min(5).max(15).pattern(phoneRegExp).required().messages({
    'string.pattern.base': 'PHONE must have only digits.',
    'any.required': 'missing required PHONE field',
  }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string().min(5).max(15).pattern(phoneRegExp).messages({
    'string.pattern.base': 'PHONE must have only digits.',
  }),
});

export const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model('contact', contactSchema);

export default Contact;
