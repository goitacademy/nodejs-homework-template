const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegExp = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/;

const joiAddSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().pattern(emailRegExp).required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
});

const joiUpdSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    match: emailRegExp,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model('contact', contactSchema);

module.exports = { Contact, joiAddSchema, joiUpdSchema };
