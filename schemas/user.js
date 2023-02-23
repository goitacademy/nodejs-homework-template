const Joi = require('joi');
const {
  regExps: { passwordRegExp, emailRegExp },
} = require('../helpers/');

const logInSchema = Joi.object().keys({
  password: Joi.string().pattern(passwordRegExp).required(),
  email: Joi.string().lowercase().pattern(emailRegExp).required(),
});
const signUpSchema = logInSchema.keys({
  confirmPassword: Joi.string().required().valid(Joi.ref('password')),
});

module.exports = {
  signUpSchema,
  logInSchema,
};
