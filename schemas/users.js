const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
});

const loginSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

module.exports = { schemas };
