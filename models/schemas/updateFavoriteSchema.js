const Joi = require("joi");

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required().messages({
      'any.required': 'missing field favorite',
  }),
})

module.exports = updateFavoriteSchema;