const Joi = require('joi')

const contactsSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).required()
})

module.exports = contactsSchema
