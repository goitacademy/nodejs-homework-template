const Joi = require('joi');
const { patternPhone, emailConfigJoi } = require('./configValidate');

const schemaValidatePOST = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  phone: Joi.string().min(10).max(13).pattern(patternPhone).required(),
  email: Joi.string().email(emailConfigJoi).required(),
});

module.exports = { schemaValidatePOST };
