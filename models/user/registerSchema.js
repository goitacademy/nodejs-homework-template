const Joi = require('joi');

const { emailRegexp } = require('./userSchema');

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  registerSchema,
};
