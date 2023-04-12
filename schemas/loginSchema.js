const Joi = require("joi");

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

module.exports = loginSchema;
