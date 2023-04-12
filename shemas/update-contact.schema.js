const Joi = require('joi');

const updateContactSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    
    phone: Joi.string()
        .min(3)
        .max(14)
})

module.exports = {
    updateContactSchema
}