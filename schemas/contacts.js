const Joi = require('joi');

const contactsAddSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    'any.required': `missing required 'name' field`,
    'string.empty': `'name' cannot be an empty field`,
  }),

  phone: Joi.string()
    .min(6)
    .required()
    .pattern(/^[0-9()+-]+$/)
    .messages({
      'any.required': `missing required 'phone' field`,
      'string.empty': `'phone' cannot be an empty field`,
      'string.pattern.base': `only numbers, parentheses and '+' and '-' signs`,
    }),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'uk'] },
    })
    .options({ presence: 'required' })
    .messages({
      'any.required': `missing required 'email' field`,
      'string.empty': `'email' cannot be an empty field`,
    }),
});

module.exports = { contactsAddSchema };
