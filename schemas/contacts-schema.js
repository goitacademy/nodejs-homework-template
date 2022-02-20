const Joi = require('joi');

const contactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(15).required(),
});

module.exports = contactsSchema;
