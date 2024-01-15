const Joi = require('joi');

const registerUser = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email should be a string',
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).max(15).required().messages({
    'string.base': 'Password should be a string',
    'string.min': 'Password should be at least {#limit} characters long',
    'string.max': 'Password should be less than or equal to {#limit} characters',
    'any.required': 'Password is required',
  }),
})

module.exports = registerUser;