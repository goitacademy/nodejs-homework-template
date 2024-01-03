const Joi = require("joi");

const registerSchema = Joi.object({
  // name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const authValidation = {
  registerSchema,
  loginSchema,
};

module.exports = authValidation;
