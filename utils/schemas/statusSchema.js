const Joi = require("joi");

const statusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = statusSchema;
