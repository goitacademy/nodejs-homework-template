import Joi from 'joi';
import { Schema, model } from 'mongoose';
import { handleSaveError } from './hooks.js';
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      // match: /^minDomainSegments: 2, tlds: { allow: ['com', 'net'] } $/,
      required: true,
    },
    phone: {
      type: String,
      // match: /^\(\d{3}\) \d{3}-\d{4}$/,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.post('save', handleSaveError);
const Contact = model('contact', contactSchema);
export default Contact;

export const contactAddShcema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
  favorite: Joi.string(),
});
