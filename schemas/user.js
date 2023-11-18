const Joi = require("joi");


const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

module.exports = schemas;
