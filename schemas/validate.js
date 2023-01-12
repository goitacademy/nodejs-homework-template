const Joi = require ("joi")

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string().pattern(new RegExp('/^[0-9()]+$/'))
})

module.exports = schema