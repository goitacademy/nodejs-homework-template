const Joi = require('joi');

const contactJoiSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `missing required name field`,
    'string.empty': `name cannot be an empty field`,
  }),
  email: Joi.string().email().required().messages({
    'any.required': `missing required email field`,
    'string.email': `email must be a valid email address`,
    'string.empty': `email cannot be an empty field`,
  }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required()
    .messages({
      'any.required': `missing required phone field`,
      'string.pattern.base': `phone must be in the format (xxx) xxx-xxxx`,
      'string.empty': `phone cannot be an empty field`,
    }),
  favorite: Joi.boolean(),
});

const favoritJoiSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    'any.required': `missing field favorite`,
    'boolean.base': `favorite must be a boolean value`,
  }),
});

module.exports = {
  contactJoiSchema,
  favoritJoiSchema,
};
