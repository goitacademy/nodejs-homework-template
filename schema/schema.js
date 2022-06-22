const Joi = require('joi')
const numberPattern = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': `Should be a type of 'text'`,
    'any.required': `Missing required name field`,
    'string.min': `Should have a minimum length of {#limit}`,
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.base': `Should be a type of 'text'`,
      'any.required': `Missing required name field`,
      'string.min': `Should have a minimum length of {#limit}`,
    }),
  phone: Joi.string()
    .pattern(numberPattern)
    .min(9)
    .max(11)
    .required()
    .messages({
      'string.base': `Should be a type of 'text'`,
      'any.required': `Missing fields`,
      'string.min': `Should have a minimum length of {#limit}`,
    }),
})

const contactUptSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': `Should be a type of 'text'`,
    'any.required': `Missing fields`,
    'string.min': `Should have a minimum length of {#limit}`,
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.base': `Should be a type of 'text'`,
      'any.required': `Missing fields`,
      'string.min': `Should have a minimum length of {#limit}`,
    }),
  phone: Joi.string()
    .pattern(numberPattern)
    .min(9)
    .max(11)
    .required()
    .messages({
      'string.base': `Should be a type of 'text'`,
      'any.required': `Missing fields`,
      'string.min': `Should have a minimum length of {#limit}`,
    }),
})

module.exports = {
  contactAddSchema,
  contactUptSchema,
}
