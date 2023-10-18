const Joi = require('joi');

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': '"name" must be exist',
    'string.base': '"name" must be string',
  }),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string().messages({
    'string.base': '"name" must be string',
  }),
  email: Joi.string(),
  phone: Joi.string(),
});

module.exports = { contactAddSchema, contactUpdateSchema };
