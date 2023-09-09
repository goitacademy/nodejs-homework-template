const Joi = require('joi');

const schemaBodyUpd = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.number().integer()
});
module.exports = schemaBodyUpd;