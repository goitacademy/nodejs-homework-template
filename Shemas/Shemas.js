const Joi = require("joi");

const schemaAdd = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
    phone: Joi.string().trim().required(),
    favorite: Joi.boolean(),
    }).min(1).required();

const updateFavoriteSchema = Joi.object({
    favorite: Joi.bool().required(),
})

module.exports = {
    schemaAdd,
    updateFavoriteSchema,
};