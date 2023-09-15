const Joi = require('joi');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const errorMessages = {
  'any.required': `{#key} is a required field`,
  'string.email': 'email field must be a valid email',
  'string.base': `{#key} field must be a string`,
  'boolean.base': `{#key} field must be a boolean`,
  'object.unknown': `{#key} field is not allowed`,
  'object.min': 'missing fields',
};

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  // subscription: Joi.string().default('starter'),
  // token: Joi.string().default(null),
}).messages(errorMessages);

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  // subscription: Joi.string().default('starter'),
  // token: Joi.string().default(null),
}).messages(errorMessages);

module.exports = {
  registerSchema,
  loginSchema,
};
