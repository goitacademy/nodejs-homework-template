const Joi = require('joi')
const addSchemas = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  })

  module.exports = {
    addSchemas,
  }