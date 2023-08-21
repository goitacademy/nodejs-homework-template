const Joi = require('joi');

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'no required name field',
  }),
  email: Joi.string().required().messages({
    'any.required': 'no required email field',
  }),
  phone: Joi.string().required().messages({
    'any.required': 'no required phone number field',
  }),
});

module.exports = {
  contactAddSchema,
};
