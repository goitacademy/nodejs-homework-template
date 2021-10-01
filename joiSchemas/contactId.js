const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const contactIdSchema = Joi.object({
  contactId: Joi.objectId(),
})

module.exports = contactIdSchema
