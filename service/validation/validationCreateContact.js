const Joi = require('joi');

const validationCreateContact = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
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
    .pattern(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
    )
    .min(7)
    .max(20)
    .required()
    .messages({
      'any.required': 'Поле phone обязательное',
      'string.empty': 'Поле phone не может быть пустым',
    }),
});

module.exports = validationCreateContact;
