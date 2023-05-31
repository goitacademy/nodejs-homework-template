const Joi = require("joi");


const addSchema = Joi.object({
    name: Joi.string().required().min(3).max(30),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'co'] } }).required(),
    phone: Joi.string().required().min(3).max(30)
  })
  
  const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
  })
  
  const schemas = {
    addSchema,
    updateFavoriteSchema,
  }

  module.exports = schemas