const joi = require('joi')

const addContactSchema = joi.object({
  name: joi.string()
    .min(3)
    .max(100)
    .required(),
  email: joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: joi.string().length(10).pattern(/^[0-9]+$/).required()
})

module.exports = { addContactSchema }
