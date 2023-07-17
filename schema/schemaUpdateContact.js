const Joi = require('joi');

const schemaUpdateContact = Joi.object({
  name: Joi.string().messages({
    'any.required': 'Missing required <name> field',
    'string.empty': 'Field <name> cannot be an empty string',
  }),
  email: Joi.string().email().messages({
    'any.required': 'Missing required <email> field',
    'string.empty': 'Field <email> cannot be an empty string',
  }),
  phone: Joi.string().messages({
    'any.required': 'Missing required <phone> field',
    'string.empty': 'Field <phone> cannot be an empty string',
  }),
})
  .required()
  .min(1)
  .messages({
    'object.min': 'Missing fields',
  });

module.exports = schemaUpdateContact;
