const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required().alphanum().messages({
      'string.empty': `"name" cannot be an empty field`,
      'any.required': `"name" is a required field`
    }),
  email: Joi.string().required().email().messages({
      'string.empty': `"email" cannot be an empty field`,
      'any.required': `"email" is a required field`
    }),
  phone: Joi.string().required().min(7).pattern(/^[0-9]+$/).messages({
      'string.empty': `"phone" cannot be an empty field`,
      'any.required': `"phone" is a required field`
    }),
})

module.exports = schema