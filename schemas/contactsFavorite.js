const Joi = require("joi");

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().valid().required(),
});

module.exports = favoriteSchema;
