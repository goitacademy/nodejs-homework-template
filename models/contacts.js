

const { Schema, model } = require('mangoose');
const Joi = require('joi');

const contactSchema = new Schema({
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

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const updateFavoritSchema = Joi.object({ favorite: Joi.bool().required() });

const schemas = {
  addSchema,
  updateFavoritSchema,
};
const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas,
};
