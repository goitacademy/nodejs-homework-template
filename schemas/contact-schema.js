const Joi = require("joi");

const contactsSchemas = Joi.object({
  name: Joi.string().regex(/^[a-zA-Z - А-Яа-я]+$/).required().messages({
    'string.pattern.base': "Ім'я не може містити числа",
  }),
  email: Joi.string().regex(/^[a-zA-Z0-9@.-]+$/).email().required().messages({
    'string.pattern.base': "Пошта може містити лише латиницю, числа, собачку(@), тире, крапку"
  }),
  phone: Joi.string().regex(/^[0-9+\-() ]+$/).required().messages({
    'string.pattern.base': "Номер телефону може містити лише числа, плюс, тире, дужки й пробліл"
  })
});

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {contactsSchemas, updateStatusSchema};