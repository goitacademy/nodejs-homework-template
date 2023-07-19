const Joi = require("joi");

const registerSchema = Joi.object({
  subscription: Joi.string(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  token: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
