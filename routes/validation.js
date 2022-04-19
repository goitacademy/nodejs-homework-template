const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)


const schemaCreateContact = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'uk', 'ru'] } }),
    phone: Joi.string().min(3).max(11).required(),
    favorite: Joi.bool().required()
})

const schemaMongoId = Joi.object({
    contactId: Joi.objectId().required(),

})

const schemaFavoriteContact = Joi.object({
  favorite: Joi.boolean().required(),
}).messages({ message: "missing field favorite" })

module.exports = {schemaCreateContact, schemaMongoId, schemaFavoriteContact}