const Joi = require("joi");

const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
});

module.exports = { registerSchema, loginSchema };
