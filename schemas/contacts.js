const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name field is required',
    'any.required': 'Name field is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'string.empty': 'Email field is required',
    'any.required': 'Email field is required',
  }),
  phone: Joi.string().required().messages({
    'string.empty': 'Phone field is required',
    'any.required': 'Phone field is required',
    favorite: Joi.boolean(),
  }),
});

module.exports = { addSchema };