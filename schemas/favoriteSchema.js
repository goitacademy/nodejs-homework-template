const Joi = require("joi");

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().messages({
    "any.required": "missing required favorite field",
  }),
});

module.exports = favoriteSchema;
