/*const { Schema, model } = require('mongoose');

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: true,
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
  {
    versionKey: false,
    timestamps: true,
  },
);

const Contact = model('contacts', contactSchema);

module.exports = Contact;*/

const Joi = require('joi');
const { Schema, model } = require('mongoose');

const codeEmail = { minDomainSegments: 2, tlds: { allow: ['com', 'net'] } };

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: true,
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
  { versionKey: false, timestamps: true },
);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(codeEmail).required(),
  phone: Joi.string(),
  favorite: Joi.bool(),
});

const statusJoiSchema = Joi.object({
  status: Joi.string().valid('basic', 'sale', 'stock').required(),
});

const Contact = model('Contact', contactSchema);

module.exports = {
  Contact,
  joiSchema,
  statusJoiSchema,
};
