const Joi = require('joi')
const joiSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string().min(3).required(),
})
module.exports = joiSchema
