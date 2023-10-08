const Joi = require('joi');

const updateFieldFavorite = Joi.object({
    favorite: Joi.boolean(),
});


module.exports = updateFieldFavorite;