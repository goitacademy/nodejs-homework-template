// для проверки поступающих обьектов на сервер, чтобы соответствовали требованиям
const Joi = require('joi');

// создаем обязательный стандарт передаваемого обьекта
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

module.exports = contactSchema;