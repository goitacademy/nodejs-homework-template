const Joi = require('joi');

const contactsSchema = Joi.object({
  name: Joi.string().min(1).max(24).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

module.exports = contactsSchema;
