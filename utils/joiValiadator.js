const Joi = require('joi');


exports.contactsValiadation = (data) => Joi.object()
    .options({abortEarly: false})
    .keys({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2 }).required(),
    phone: Joi.string().min(7).max(15).required(),
    })
    .validate(data)

