const Joi = require('joi');

const contactsAddSchema = Joi.object({
  name: Joi.required(),
  email: Joi.string().email().required(),
  phone: Joi.required(),
});

module.exports = contactsAddSchema;
