const Joi = require('joi');

const addScheme = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite:  Joi.boolean(),
});

const updateFavoriteScheme = Joi.object({
    favorite: Joi.boolean().required()
})

module.exports = {
    addScheme,
    updateFavoriteScheme
};

