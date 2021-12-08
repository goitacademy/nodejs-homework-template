const { Schema, model } = require('mongoose');
const Joi = require('joi');

const phoneRegex = /^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchemaAdd = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().regex(phoneRegex).required(),
});

const joiSchemaUpdate = Joi.object({
  name: Joi.string().alphanum().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().regex(phoneRegex).optional(),
}).or('name', 'email', 'phone');

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  joiSchemaAdd,
  joiSchemaUpdate,
};
