const Joi = require('joi')

const contactsAddSchema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    phone:Joi.string().trim().pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/).required()
})

module.exports = contactsAddSchema;