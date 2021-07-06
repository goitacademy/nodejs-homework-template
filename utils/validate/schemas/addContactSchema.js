const Joi = require('joi')

const addContactSchema = Joi.object({
  name: Joi.string().alphanum().min(2).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string(),
})

module.exports = addContactSchema
