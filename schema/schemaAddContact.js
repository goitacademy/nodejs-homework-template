const Joi = require('joi');

const schemaAddContact = Joi.object({
  name: Joi.string()
    .messages({
      'any.required': 'Missing required <name> field',
      'string.empty': 'Field <name> cannot be an empty string',
    })
    .required(),
  email: Joi.string()
    .email()
    .lowercase()
    .messages({
      'any.required': 'Missing required <email> field',
      'string.empty': 'Field <email> cannot be an empty string',
    })
    .required(),
  phone: Joi.string()
    .messages({
      'any.required': 'Missing required <phone> field',
      'string.empty': 'Field <phone> cannot be an empty string',
    })
    .required(),
});

module.exports = schemaAddContact;
