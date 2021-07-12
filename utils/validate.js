const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string().regex(/^[0-9]{10}$/)
    .messages({ 'string.pattern.base': 'Phone number must have 10 digits.' })
    .required()
})

module.exports = contactSchema
