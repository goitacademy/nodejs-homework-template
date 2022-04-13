const Joi = require('joi');
const { regexName, regexEmail } = require('../../../helpers/regex');
const {
  USER_NAME_LIMIT,
  USER_PASSWORD_LIMIT,
  USER_SUBSCRIPTION_TYPE,
} = require('../../../helpers/constants');

const validationSignupUser = Joi.object({
  name: Joi.string()
    .pattern(regexName)
    .min(USER_NAME_LIMIT.MIN)
    .max(USER_NAME_LIMIT.MAX)
    .required()
    .messages({
      'any.required': 'Name is required',
      'string.empty': 'The name cannot be empty',
    }),
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
  subscription: Joi.string()
    .valid(...Object.values(USER_SUBSCRIPTION_TYPE))
    .optional()
    .default(USER_SUBSCRIPTION_TYPE.STARTER)
    .messages({
      'any.only': `Subscription is one of: ${Object.values(
        USER_SUBSCRIPTION_TYPE,
      )}`,
    }),
  avatarURL: Joi.string().optional().default(null).messages({
    'any.optional': "avatarURL isn't required",
    'string.empty': 'The avatarURL cannot be empty',
  }),
});

module.exports = validationSignupUser;
