const Joi = require('joi')



//* ++++++++++++++++++++++ Схемы ВАЛИДАЦИИ Joi +++++++++++++++++++++++++
const contactSchemaPostPut = Joi.object({
    name: Joi.string()
        // .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua', 'org',] } })
        .required(),

    phone: Joi.string()
        // .alphanum()
        .min(5)
        .max(14)
        .required(),
});

//--------------------------------------------------------------------
const contactSchemaPatch = Joi.object({
    name: Joi.string()
        // .alphanum()
        .min(3)
        .max(30)
        .optional(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua', 'org',] } })
        .optional(),

    phone: Joi.string()
        // .alphanum()
        .min(5)
        .max(14)
        .optional(),
});
//* _______________________ Схемы ВАЛИДАЦИИ Joi _______________________


// module.exports = contactSchemaPostPut

module.exports = {
    contactSchemaPostPut,
    contactSchemaPatch
}