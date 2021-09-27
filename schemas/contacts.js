const Joi = require('joi')

const joiStrictSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
})

const joiOptionalSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string()
})

module.exports = {
  joiStrictSchema,
  joiOptionalSchema
}
