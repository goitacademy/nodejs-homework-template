const Joi = require('joi');

const schemaValidate = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean()
    // .valid(true, false)
});

const schemaValidateStatus = Joi.object({
    favorite: Joi.boolean().valid(true, false)
});

module.exports = {
    schemaValidate,
    schemaValidateStatus
};