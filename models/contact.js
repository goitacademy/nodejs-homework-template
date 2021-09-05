const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 30,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      minlength: 10,
      match: /^\(?\d{3}\)?[ ]?\d{3}[- ]?\d{4}$/,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true },
);

const JoiSchemaAddContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: true },
    })
    .required(),
  phone: Joi.string()
    .length(14)
    .pattern(/^\(?\d{3}\)?[ ]?\d{3}[- ]?\d{4}$/)
    .required(),
  favorite: Joi.bool(),
});

const JoiSchemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: true },
    })
    .optional(),
  phone: Joi.string()
    .length(10)
    .pattern(/^\(?\d{3}\)?[ ]?\d{3}[- ]?\d{4}$/)
    .optional(),
  favorite: Joi.bool(),
}).or('name', 'email', 'phone', 'favorite');

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  JoiSchemaAddContact,
  JoiSchemaUpdateContact,
};
