const Joi = require("joi");

const favoriteContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = favoriteContactSchema;
