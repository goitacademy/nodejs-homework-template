const Joi = require('joi');

const schemaAdd = Joi.object({
    name: Joi.string()
        .min(2)
        .trim()
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .trim()
        .required(),
    phone: Joi.string()
        .trim()
        .required(),
});

const schemaUpdate = Joi.object({
    name: Joi.string()
        .min(2)
        .trim(),
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .trim(),
    phone: Joi.string()
        .trim()
}).min(1);

const schemaUpdateFavorite = Joi.object({
    favorite: Joi.boolean()
    .required()
})

module.exports = {
    schemaAdd,
    schemaUpdate,
    schemaUpdateFavorite,
};