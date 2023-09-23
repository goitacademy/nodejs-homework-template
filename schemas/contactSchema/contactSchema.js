const Joi = require('joi');
const { phoneRegExp } = require('../../utils');

const contactSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(20)
    .messages({
      'any.required': `missing required name field`,
    })
    .required(),
  email: Joi.string()
    .email()
    .messages({
      'any.required': `missing required email field`,
    })
    .required(),
  phone: Joi.string()
    .pattern(phoneRegExp)
    .message('Phone format: (xxx) xxx-xxxx')
    .messages({
      'any.required': `missing required phone field`,
    })
    .required(),
  favorite: Joi.boolean(),
});

module.exports = contactSchema;
