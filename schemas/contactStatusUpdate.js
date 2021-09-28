const Joi = require('joi')

const contactStatusUpdateSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

module.exports = contactStatusUpdateSchema
