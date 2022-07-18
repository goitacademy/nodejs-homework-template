const Joi = require("joi");

const favoriteContactJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = favoriteContactJoiSchema;
