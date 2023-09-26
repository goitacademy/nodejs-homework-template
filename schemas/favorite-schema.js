const Joi = require('joi');

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    'boolean.base': '"favorite" must be a boolean',
    'any.required': '"favorite" is a required field',
  }),
});

module.exports = updateFavoriteSchema;
