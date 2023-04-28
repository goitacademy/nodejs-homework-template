const Joi = require('joi');

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const adding = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(phoneRegExp)
    .message('"phone" must be a valid phone number')
    .required(),
});

const updating = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(phoneRegExp).message('"phone" must be a valid phone number'),
}).or('name', 'email', 'phone');

module.exports = { adding, updating };
