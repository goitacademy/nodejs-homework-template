const Joi = require('joi');

const contactsSchema = Joi.object()
  .min(1)
  .keys({
    name: Joi.string().min(2).messages({
      'string.empty': `'name' cannot be an empty field`,
    }),

    phone: Joi.string()
      .min(6)
      .pattern(/^[0-9()+-]+$/)
      .messages({
        'string.empty': `'phone' cannot be an empty field`,
        'string.pattern.base': `only numbers, parentheses and '+' and '-' signs`,
      }),

    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'ua'] },
      })
      .messages({
        'any.required': `missing required name field`,
        'string.empty': `'email' cannot be an empty field`,
      }),
  })
  .messages({
    'object.min': `missing fields`,
  });

module.exports = { contactsSchema };
