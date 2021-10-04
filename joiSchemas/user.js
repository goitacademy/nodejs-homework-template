const Joi = require('joi')

const userSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
})

module.exports = userSchema
