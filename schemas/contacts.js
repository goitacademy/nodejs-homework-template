const Joi = require('joi');

const contactsAddSchema = Joi.object({
    name: Joi.string().required(),
    phone:Joi.string().min(10).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required()
  })

  module.exports = {
    contactsAddSchema,
  }