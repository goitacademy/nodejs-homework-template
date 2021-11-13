const Joi = require('joi')

const joiContactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).required(),
})

module.exports = joiContactSchema
