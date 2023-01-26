const Joi = require("joi");

const updateFavoriteValidation = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = updateFavoriteValidation;
