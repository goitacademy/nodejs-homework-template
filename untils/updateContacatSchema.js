const Joi = require('joi');

const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).or('name', 'email', 'phone');

module.exports = contactUpdateSchema;
