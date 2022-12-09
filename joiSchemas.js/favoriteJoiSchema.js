const Joi = require("joi");

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = favoriteJoiSchema;
