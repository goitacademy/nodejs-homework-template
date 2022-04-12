const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)


const schemaCreateContact = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'uk', 'ru'] } }),
    phone: Joi.string().min(3).max(11).required()
})

const schemaMongoId = Joi.object({
    contactId: Joi.objectId().required(),

})
module.exports = {schemaCreateContact, schemaMongoId}