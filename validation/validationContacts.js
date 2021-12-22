const Joi = require('joi');

const contactsSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
}).or('name', 'email', 'phone', 'favorite');

module.exports = contactsSchema;
