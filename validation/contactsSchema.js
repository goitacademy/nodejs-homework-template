const Joi = require('joi');

const contactsSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).or('name', 'email', 'phone');

module.exports = contactsSchema;
