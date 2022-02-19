const Joi = require('joi');

const schemaCreateContact = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я ]+$/)
    .min(2)
    .max(40)
    .required()
    .messages({
      'any.required': 'Поле name обязательное',
      'string.empty': 'Поле name не может быть пустым',
    }),
  email: Joi.string().email().required().messages({
    'any.required': 'Поле email обязательное',
    'string.empty': 'Поле email не может быть пустым',
  }),
  phone: Joi.string()
    .pattern(/[0-9]+/)
    .min(7)
    .max(20)
    .required()
    .messages({
      'any.optional': 'Поле phone обязательное',
      'string.empty': 'Поле phone не может быть пустым',
    }),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я ]+$/)
    .min(2)
    .max(40)
    .optional()
    .messages({
      'any.optional': 'Поле name не обязательное',
      'string.empty': 'Поле name не может быть пустым',
    }),
  email: Joi.string().email().optional().messages({
    'any.optional': 'Поле email не обязательное',
    'string.empty': 'Поле email не может быть пустым',
  }),
  phone: Joi.string()
    .pattern(/[0-9]+/)
    .min(7)
    .max(20)
    .optional()
    .messages({
      'any.optional': 'Поле phone не обязательное',
      'string.empty': 'Поле phone не может быть пустым',
    }),
});

module.exports = { schemaCreateContact, schemaUpdateContact };
