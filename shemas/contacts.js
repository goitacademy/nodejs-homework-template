const Joi = require("joi");

// створюємо об'єкт Joi, тобто вказуємо вимоги до об'єкту(як propTypes), за допомогою якого первіряємо тіло body
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

module.exports = {
  addSchema,
};
