const Joi = require('joi');

const { emailRegexp } = require('./userSchema');

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  loginSchema,
};
