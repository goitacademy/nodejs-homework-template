const Joi = require('joi');

const schemaRegister = Joi.object({
  password: Joi.string().min(3).required().messages({
    'any.required': 'Missing required <password> field',
    'string.empty': 'Field <password> cannot be an empty string',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Missing required <email> field',
    'string.empty': 'Field <email> cannot be an empty string',
  }),
});

const schemaLogin = Joi.object({
  password: Joi.string().min(3).required().messages({
    'any.required': 'Missing required <password> field',
    'string.empty': 'Field <password> cannot be an empty string',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Missing required <email> field',
    'string.empty': 'Field <email> cannot be an empty string',
  }),
});

module.exports = {
  schemaRegister,
  schemaLogin,
};
