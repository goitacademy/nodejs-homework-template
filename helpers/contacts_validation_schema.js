const Joi = require('@hapi/joi')

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  phone: Joi.string().pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/).required(),
  favorite: Joi.boolean()
})

const contactsUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().lowercase(),
  phone: Joi.string().pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
  favorite: Joi.boolean()
})

const contactStatusSchema = Joi.object({
  favorite: Joi.boolean().required()
})

module.exports = {
  contactsSchema,
  contactStatusSchema,
  contactsUpdateSchema,
}