const Joi = require("joi");

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
}).messages({
  "any.required": "missing field {#key}",
});

module.exports = contactUpdateFavoriteSchema;
