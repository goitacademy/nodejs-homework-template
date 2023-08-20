const Joi = require("joi");

// створюємо об'єкт Joi, тобто вказуємо вимоги до об'єкту(як propTypes), за допомогою якого первіряємо тіло body

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
  token: Joi.string().required,
});

module.exports = {
  registerSchema,
  loginSchema,
};
