const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().min(1).required(),
  phone: Joi.string().min(1).required()
})

module.exports = contactSchema
