const Joi = require("joi");
const emailRegExp = /[\w-]+@([\w-]+\.)+[\w-]+/;

const loginUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(8).required(),
});

module.exports = { loginUserSchema };
