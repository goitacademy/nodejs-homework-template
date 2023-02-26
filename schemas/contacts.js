const Joi = require("joi")

const addContactSchema = Joi.object({
    name: Joi.string().regex(/^[A-Z][a-z]+ [A-Z][a-z]+$/).required(),
    email: Joi.string().email({ minDomainSegments: 2, }).required(),
    phone: Joi.string().pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/).required(),
  })
  
  const updateContactSchema = Joi.object({
    name: Joi.string().regex(/^[A-Z][a-z]+ [A-Z][a-z]+$/).min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, }).required(),
    phone: Joi.string().pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/).required(),
  })

  module.exports = {
    addContactSchema,
    updateContactSchema,
  }