const Joi = require('joi')
// const shemas = require('./schemas')

// const joiSchema = Joi.object({
//   name: shemas.name.required(),
//   email: shemas.email.required(),
//   phone: shemas.phone.required(),
// })

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
})

module.exports = joiSchema
