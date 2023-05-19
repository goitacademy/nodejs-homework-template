const Joi = require('joi')

const contactsAddSchema = Joi.object({
    name:Joi.string().required().label('name'),
    email:Joi.string().email().required().label('email'),
    phone:Joi.string().trim().pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/).required().label('phone')
})

module.exports = contactsAddSchema;