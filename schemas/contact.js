const Joi = require('joi');

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).max(15).required(),
})

module.exports = contactsSchema