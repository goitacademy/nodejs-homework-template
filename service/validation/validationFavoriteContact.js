const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const validationFavoriteContact = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ 'any.required': 'Поле favorite обязательное' }),
});

module.exports = validationFavoriteContact;
