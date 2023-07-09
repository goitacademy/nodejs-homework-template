const Joi = require('joi');

const addSchema = Joi.object({
    name: Joi.string()
    .min(3)
    .max(30)
    .required(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.number().required()
})

module.exports = {
    addSchema,
}