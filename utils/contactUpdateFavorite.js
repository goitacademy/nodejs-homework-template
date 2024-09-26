const Joi = require('joi');

const contactUpdateFavorite = Joi.object({
    favorite: Joi.boolean().required(),
});

module.exports = contactUpdateFavorite;