const Joi = require('joi')

const joiContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string()
    .pattern(new RegExp('^[0-9]{3}-[0-9]{3}-[0-9]{4}$'))
})

module.exports = joiContactSchema
