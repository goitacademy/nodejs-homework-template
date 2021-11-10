const Joi = require('joi')

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
})

const joiSchemaUpdate = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.boolean(),
}).or('name', 'email', 'phone', 'favorite')

module.exports = {
  joiSchema,
  joiSchemaUpdate,
}
