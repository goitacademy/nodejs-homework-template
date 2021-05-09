const Joi = require('joi')

const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({
      tlds: {
        allow: false
      }
    })
    .required(),
  phone: Joi.string()
    .pattern(/^[(][\d]{3}[)]\s[\d]{3}[-][\d]{4}/)
    .required()
})

module.exports = { schema }
