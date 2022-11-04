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
        .integer()
        .required(),
    
})

const schemaPutContact = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.number()
        .integer(),
}).min(1)
        

        

module.exports = {
    schemaPostContact,
    schemaPutContact
}