const Joi = require('joi');

const addContactSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.base': `"name" should be a type of string`,
    'string.empty': `"name" must contain value`,
    'any.required': `"name" is a required field`,
  }),
  email: Joi.string().required().messages({
    'string.base': `"email" should be a type of string`,
    'string.empty': `"email" must contain value`,
    'any.required': `"email" is a required field`,
  }),
  phone: Joi.string()
    .trim()
    .regex(/^\(\d\d\d\) \d\d\d-\d\d\d\d$/i)
    .required()
    .messages({
      'string.base': `"phone" should be a type of string`,
      'string.empty': `"phone" must contain value`,
      'string.pattern.base': `"phone" must be contain 10 numbers and look like (095) 837-0388`,
      'any.required': `"phone" is a required field`,
    }),
})
  .required()
  .messages({
    'any.required': `missing fields`,
  });

const updateContactSchema = Joi.object({
  name: Joi.string().trim().messages({
    'string.base': `"name" should be a type of string`,
    'string.empty': `"name" must contain value`,
  }),
  email: Joi.string().messages({
    'string.base': `"email" should be a type of string`,
    'string.empty': `"email" must contain value`,
  }),
  phone: Joi.string()
    .trim()
    .regex(/^\(\d\d\d\) \d\d\d-\d\d\d\d$/i)
    .messages({
      'string.base': `"phone" should be a type of string`,
      'string.empty': `"phone" must contain value`,
      'string.pattern.base': `"phone" must be contain 10 numbers and look like (095) 837-0388`,
    }),
})
  .or('name', 'email', 'phone')
  .messages({
    'object.missing': `missing fields`,
  });

module.exports = {
  addContactSchema,
  updateContactSchema,
};
