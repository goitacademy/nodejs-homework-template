import { Schema, model } from 'mongoose';
import { handleSaveError, preUpdate } from './hooks.js';
import Joi from 'joi';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post('save', handleSaveError);
contactSchema.pre('findOneAndUpdate', preUpdate);
contactSchema.post('findOneAndUpdate', handleSaveError);

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `"name" field is required`,
    'string.base': `"name" must be a text`,
  }),
  email: Joi.string().required().messages({
    'any.required': `"email" field is required`,
  }),
  phone: Joi.string().required().messages({
    'any.required': `"phone" field is required`,
  }),
  favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().messages({
    'string.base': `"name" must be a text`,
  }),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

export const contactFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model('Contact', contactSchema);

export default Contact;
