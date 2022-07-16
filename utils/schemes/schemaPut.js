const Joi = require('joi');
const { patternPhone, emailConfigJoi } = require('./configValidate');
const { messages } = require('../options');

const schemaValidatePut = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .messages({
      'string.empty': messages.messageEmptyField('name'),
    }),
  phone: Joi.string()
    .min(10)
    .max(13)
    .pattern(patternPhone)
    .messages({
      'string.empty': messages.messageEmptyField('name'),
    }),
  email: Joi.string()
    .email(emailConfigJoi)
    .messages({
      'string.empty': messages.messageEmptyField('name'),
    }),
}).messages({ 'object.unknown': messages['unknown-field'] });

module.exports = { schemaValidatePut };
