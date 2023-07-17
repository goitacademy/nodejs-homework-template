const Joi = require('joi');

const schemaUpdateContact = Joi.object({
  name: Joi.string().messages({
    'any.required': 'Missing required name field',
    'string.empty': 'Name field cannot be an empty string',
  }),
  email: Joi.string().email().messages({
    'any.required': 'Missing required email field',
    'string.empty': 'Email field cannot be an empty string',
  }),
  phone: Joi.string().messages({
    'any.required': 'Missing required phone number field',
    'string.empty': 'Phone number field cannot be an empty string',
  }),
})
  .required()
  .min(1)
  .messages({
    'object.min': 'Missing fields',
  });

module.exports = schemaUpdateContact;
