const Joi = require('@hapi/joi')

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  phone: Joi.string().pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/).required()
})

module.exports = {
  contactsSchema
}