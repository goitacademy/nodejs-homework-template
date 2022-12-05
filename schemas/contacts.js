const Joi = require('joi')

const addSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
})

module.exports = {
  addSchema
}