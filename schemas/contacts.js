const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9 ]{3,30}$/)
    .required()
    .messages({
      'any.required': 'Missing required name field',
      'string.base': 'Name field must be a string',
      'string.pattern.base': 'Name field may contain only latin letters, numbers and spaces',
    }),
  email: Joi.string()
    .pattern(/^([a-z0-9_.-]+)@([a-z09_.-]+).([a-z]{2,6})$/)
    .required()
    .messages({
      'any.required': 'Missing required email field',
      'string.base': 'Email field must be a string',
      'string.pattern.base':
        'Email field may contain only latin letters, numbers, signs ("_", ".", "-"). Must contain @ and domain.',
    }),
  phone: Joi.string()
    .pattern(/^[+]?[0-9-]{5,13}$/)
    .required()
    .messages({
      'any.required': 'Missing required phone field',
      'string.base': 'Phone field must be a string',
      'string.pattern.base': 'Phone field may contain only optional symbol "+" and numbers',
    }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    'any.required': 'missing field favorite',
  }),
});

module.exports = {
  addSchema,
  updateFavoriteSchema,
};
