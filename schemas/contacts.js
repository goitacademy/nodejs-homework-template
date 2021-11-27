const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.number().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.string().required()
})

module.exports = contactSchema
