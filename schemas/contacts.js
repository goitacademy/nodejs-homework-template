const Joi = require('joi');

const contactsSchema = Joi.object({
  name: Joi.required(),
  email: Joi.required(),
  phone: Joi.required(),
});

module.exports = contactsSchema;
