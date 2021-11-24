const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number()
    .integer()
    .min(10 ** 9)
    .max(10 ** 10 - 1)
    .required(),
})

module.exports = contactSchema
