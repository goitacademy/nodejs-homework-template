const Joi = require('joi');

const schemaAddContact = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Missing required name field',
    'string.empty': 'Name field cannot be an empty string',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Missing required email field',
    'string.empty': 'Email field cannot be an empty string',
  }),
  phone: Joi.string().required().messages({
    'any.required': 'Missing required phone number field',
    'string.empty': 'Phone number field cannot be an empty string',
  }),
});

module.exports = schemaAddContact;
