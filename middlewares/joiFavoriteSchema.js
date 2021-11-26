const Joi = require("joi");

const joiFavSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = joiFavSchema;
