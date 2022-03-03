const Joi = require('joi');
const { patternPhone, emailConfigJoi } = require('./configValidate');
const { messages } = require('../options');

const schemaValidatePost = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'any.required': messages.messageRequireField('name'),
      'string.empty': messages.messageEmptyField('name'),
    }),
  phone: Joi.string()
    .min(10)
    .max(13)
    .pattern(patternPhone)
    .required()
    .messages({
      'any.required': messages.messageRequireField('phone'),
      'string.empty': messages.messageEmptyField('phone'),
    }),
  email: Joi.string()
    .email(emailConfigJoi)
    .required()
    .messages({
      'any.required': messages.messageRequireField('email'),
      'string.empty': messages.messageEmptyField('email'),
    }),
}).messages({ 'object.unknown': messages['unknown-field'] });

module.exports = { schemaValidatePost };
