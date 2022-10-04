const Joi = require("joi");

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = favoriteSchema;
