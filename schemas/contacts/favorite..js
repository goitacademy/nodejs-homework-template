const Joi = require("joi");

const favorite = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = favorite;
