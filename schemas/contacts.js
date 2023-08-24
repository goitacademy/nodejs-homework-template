const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required()
    .messages({
      'string.base': 'Name should be a text',
      'string.alphanum': 'Name should only contain letters and numbers',
      'string.min': 'Name should be at least {#limit} characters long',
      'string.max': 'Name should not be more than {#limit} characters long',
      'any.required': 'Name is a required field'
    }),
  email: Joi.string().email().required()
    .messages({
      'string.base': 'Email should be a text',
      'string.email': 'Enter a valid email',
      'any.required': 'Email is a required field'
    }),
  phone: Joi.string().required()
    .messages({
      'string.base': 'Phone number should be a text',
      'any.required': 'Phone number is a required field'
    })
});

module.exports = {
    addSchema,
}