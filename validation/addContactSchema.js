const Joi = require('joi')

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(new RegExp('^[\\d() +-]+$')).required(),
})

module.exports = addContactSchema
