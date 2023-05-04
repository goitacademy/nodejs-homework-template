const Joi = require('joi');

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const adding = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required().messages({
    'string.email': '{#key} is not valid',
  }),
  phone: Joi.string().pattern(phoneRegExp).required().messages({
    'string.pattern.base': '{#key} is not valid',
  }),
})
.messages({
  'any.required': 'missing required {#key}',
});

const updating = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().message('{#key} is not valid'),
  phone: Joi.string().pattern(phoneRegExp).message('{#key} is not valid'),
})
  .or('name', 'email', 'phone')
  .messages({
    'object.missing': 'missing fields',
  });

module.exports = { adding, updating };
