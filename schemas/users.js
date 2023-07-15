const Joi = require("joi");


const registerSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};