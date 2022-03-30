const Joi = require('joi')

const schemaCreateContact = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'uk', 'ru'] } }),
    phone: Joi.string().required()
})

module.exports = {schemaCreateContact}