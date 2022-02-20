const Joi = require('joi');

const schemaCreateContact = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    phone: Joi.string()
        .pattern(new RegExp('^[0-9]{7,10}$')).required(),


    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }).required()
})

module.exports = {schemaCreateContact}