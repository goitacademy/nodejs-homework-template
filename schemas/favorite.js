const Joi = require("joi");

const contactStatusSchema = Joi.object({
  favorite: Joi.boolean().default("false").required(),
});

module.exports = contactStatusSchema;
