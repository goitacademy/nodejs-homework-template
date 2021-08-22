const Joi = require('joi')

const updateContactSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().pattern(new RegExp('^[\\d() +-]+$')).optional(),
})

module.exports = updateContactSchema
