const Joi = require("joi");

const favoriteUpdateSchemas = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = favoriteUpdateSchemas;
