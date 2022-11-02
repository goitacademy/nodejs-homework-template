const Joi = require('joi');

const  schemaPostContact = Joi.object({
   name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    phone: Joi.number()
        .integer(),
})

const schemaPutContact = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.number()
        .integer(),
        })

module.exports = {
    schemaPostContact,
    schemaPutContact
}