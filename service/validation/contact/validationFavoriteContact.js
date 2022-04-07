const Joi = require('joi');

const validationFavoriteContact = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ 'any.required': 'Favorite is required' }),
});

module.exports = validationFavoriteContact;
