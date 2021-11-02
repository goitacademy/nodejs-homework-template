const Joi = require('joi')

const joySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

module.exports = joySchema