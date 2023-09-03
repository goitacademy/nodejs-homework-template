const Joi = require("joi");

const contactFavoriteValidationScheme = Joi.object({
  favorite: Joi.bool().required("Missing field favorite"),
});

module.exports = contactFavoriteValidationScheme;
