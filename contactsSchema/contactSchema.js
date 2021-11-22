const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).required(),

})

module.exports = contactSchema
