const {Schema, model} = require('mongoose');
const Joi = require('joi');
const {handleSchemaValidationErrors} = require('../helpers');

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

contactSchema.post('save', handleSchemaValidationErrors);

const addSchema = Joi.object({
  name: Joi.string()
    .min(4)
    .max(20)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } })
    .required(),

  phone: Joi.string()
    .min(8)
    .max(14)
    .required(),
})

const upadateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
})

const schemas = {
  addSchema,
  upadateFavoriteSchema,
}

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  schemas,
}