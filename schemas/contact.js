const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().min(1).max(10).required(),
  email: Joi.string().email().min(5).required(),
  phone: Joi.string()
    .pattern(/^[0-9]/)
    .min(5)
    .max(12)
    .required(),
})

module.exports = contactSchema
