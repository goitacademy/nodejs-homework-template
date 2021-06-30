const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().min(2).required(),
  phone: Joi.string().min(0).required(),
})

module.exports = contactSchema
