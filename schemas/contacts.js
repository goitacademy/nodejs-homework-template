const Joi = require('joi')

const contactShema = Joi.object({
  name: Joi.string().min(1).required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  email: Joi.string().min(1).required(),
})

module.exports = contactShema
