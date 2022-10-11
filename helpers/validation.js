const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string()
    .max(100)
    .messages({
      'string.empty': 'field must contain `name`',
      'any.required': 'missing required `name` field',
    })
    .required(),
  email: Joi.string()
    .email()
    .messages({
      'string.empty': 'field must contain `email`',
      'string.email': 'email is invalid',
      'any.required': 'missing required `email` field',
    })
    .required(),
  phone: Joi.string()
    .pattern(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)
    .messages({
      'string.empty': 'field must contain `phone number`',
      'string.pattern.base': 'phone number is invalid',
      'any.required': 'missing required `phone` field',
    })
    .required(),
});

module.exports = addSchema;
