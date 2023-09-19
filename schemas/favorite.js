const Joi = require("joi");

const addSchemaFavorite = Joi.object({
    favorite: Joi.boolean().required(),
})

module.exports = addSchemaFavorite