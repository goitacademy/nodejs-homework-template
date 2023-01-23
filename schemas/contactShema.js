const Joi = require("joi");

const addContactSchema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    })

module.exports = {
        addContactSchema,
    }