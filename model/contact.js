const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { required } = require('joi');

const contactSchema = Schema({
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
});

const schemaContactJoi = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const Contact = model('contact', contactSchema);

module.exports = { Contact, schemaContactJoi };
