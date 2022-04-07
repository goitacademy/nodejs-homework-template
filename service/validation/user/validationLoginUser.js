const Joi = require('joi');
const { regexEmail } = require('../../../helpers/regex');
const { USER_PASSWORD_LIMIT } = require('../../../helpers/constants');

const validationLoginUser = Joi.object({
  email: Joi.string().pattern(regexEmail).required().messages({
    'any.required': 'Email is required',
    'string.empty': 'The email cannot be empty',
  }),
  password: Joi.string()
    .min(USER_PASSWORD_LIMIT.MIN)
    .max(USER_PASSWORD_LIMIT.MAX)
    .required()
    .messages({
      'any.required': 'Password is required',
      'string.empty': 'The password cannot be empty',
    }),
});

module.exports = validationLoginUser;
