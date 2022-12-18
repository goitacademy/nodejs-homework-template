const Joi = require("joi");

const emailRegExp = /[\w-]+@([\w-]+\.)+[\w-]+/;

const registerUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(8).required(),
});

module.exports = { registerUserSchema };
