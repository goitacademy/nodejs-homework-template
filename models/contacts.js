const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require("../helpers");

const contactsShema = new Schema({
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

const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `missing required name field`,
  }),
  email: Joi.string().required().messages({
    'any.required': `missing required email field`,
  }),
  phone: Joi.string().required().messages({
    'any.required': `missing required phone field`,
  }),
  favorite: Joi.boolean(),
});

const schemas = { contactsAddSchema };

contactsShema.post('save', handleMongooseError);

const Contacts = model('Contacts', contactsShema);

module.exports = { Contacts, schemas, };