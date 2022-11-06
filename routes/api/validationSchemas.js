const Joi = require('joi');

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'any.required': 'Name is required',
    'string.empty': 'No empty field',
    'string.min': 'Name is 3 symbols min lenght',
    'string.max': 'Name is 30 symbols max lenght',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.empty': 'No empty fields',
    'string.email': 'Enter vaild email',
  }),

  phone: Joi.string()
    .pattern(/^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/)
    .required()
    .messages({
      'any.required': 'Phone is required',
      'string.empty': 'No empty fields',
      'object.pattern.match': 'Enter valid phone number',
    }),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'any.required': 'Name is required',
    'string.empty': 'No empty field',
    'string.min': 'Name is 3 symbols min lenght',
    'string.max': 'Name is 30 symbols max lenght',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.empty': 'No empty fields',
    'string.email': 'Enter vaild email',
  }),

  phone: Joi.string()
    .pattern(/^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/)
    .required()
    .messages({
      'any.required': 'Phone is required',
      'string.empty': 'No empty fields',
      'object.pattern.match': 'Enter valid phone number',
    }),
});

module.exports = { schemaCreateContact, schemaUpdateContact };
