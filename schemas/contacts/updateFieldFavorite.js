const Joi = require('joi');

const updateFieldFavorite = Joi.object({
    favorite: Joi.boolean()
        .required()
        .messages({ "any.required": "missing field favorite" }),
    
    name: Joi.string()
        .forbidden()
        .messages({ 'any.unknown': 'The "name" field is not allowed' }),
    
});


module.exports = updateFieldFavorite;