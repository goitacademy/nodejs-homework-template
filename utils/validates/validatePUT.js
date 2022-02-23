const Joi = require('joi');
const { patternPhone, emailConfigJoi } = require('./configValidate');

const schemaValidatePUT = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  phone: Joi.string().min(10).max(13).pattern(patternPhone),
  email: Joi.string().email(emailConfigJoi),
});

module.exports = { schemaValidatePUT };
