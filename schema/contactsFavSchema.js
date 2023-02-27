const Joi = require("joi");

const contactsFavSchema = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = contactsFavSchema;
