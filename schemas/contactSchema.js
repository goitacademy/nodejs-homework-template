const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().regex(/^[0-9]{10}$/).required()
})

module.exports = contactSchema;