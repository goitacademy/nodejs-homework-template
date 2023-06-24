const Joi = require('joi');

exports.contactsValiadation = (data) => Joi.object()
    .options({abortEarly: false})
    .keys({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
    email: Joi.string()
        .email({ minDomainSegments: 2 }),
    phone: Joi.string().min(7).max(15),
    favorite: Joi.boolean().required()
    })
    .validate(data)

exports.contactsValiadationFavorite = (data) => Joi.object()
    .options({abortEarly: false})
    .keys({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean().required()
    })
    .validate(data)