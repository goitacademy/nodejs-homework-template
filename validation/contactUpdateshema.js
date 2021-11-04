const Joi = require('joi')

const contactUpdateShema = Joi.alternatives().try(
  Joi.object({
    name: Joi.string().allow(''),
    email: Joi.string().allow(''),
    phone: Joi.string().required()
  }),
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().allow(''),
    phone: Joi.string().allow('')
  }),
  Joi.object({
    name: Joi.string().allow(''),
    email: Joi.string().required(),
    phone: Joi.string().allow('')
  })
)

module.exports = contactUpdateShema
