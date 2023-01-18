const Joi = require ("joi")

const addContactValidate = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string().pattern(/^[0-9() -]+$/, "numbers"),
  favorite: Joi.boolean().optional().default(false),
})

module.exports = {addContactValidate}