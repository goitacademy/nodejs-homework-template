const Joi = require('joi');
const { passwordRegExp, emailRegExp } = require('../../utils');

const loginSchema = Joi.object({
  password: Joi.string().min(6).pattern(passwordRegExp).required(),
  email: Joi.string().pattern(emailRegExp).required(),
});

module.exports = loginSchema;
