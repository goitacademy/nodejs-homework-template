const Joi = require('joi');

const favoriteScheme = Joi.object({
    favorite: Joi.boolean().required(),
})

module.exports = favoriteScheme;