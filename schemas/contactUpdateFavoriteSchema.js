const Joi = require("joi");

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
  }),
});

module.exports = contactUpdateFavoriteSchema;
