const Joi = require('joi')

const contasctsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
})

module.exports = contasctsSchema
