const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'missing required name field',
  }),
  email: Joi.string().required().messages({
    'any.required': 'missing required email field',
    'string.email': 'invalid email format',
  }),
  phone: Joi.string().required().messages({
    'any.required': 'missing required phone field',
  }),
});

module.exports = {
  addSchema,
};
