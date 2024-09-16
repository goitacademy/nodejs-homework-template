const Joi = require('joi');
const { emailRegExp } = require('../../utils');

const emailSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegExp)
    .messages({
      'any.required': `missing required email field`,
    })
    .required(),
});

module.exports = emailSchema;
