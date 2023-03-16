const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({ 'any.only': 'missing required name field' }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .messages({ 'any.required': 'missing required email field' }),
  phone: Joi.string()
    .min(5)
    .max(15)
    .required()
    .messages({ 'any.required': 'missing required phone field' }),
}).min(1);

module.exports = contactSchema;
