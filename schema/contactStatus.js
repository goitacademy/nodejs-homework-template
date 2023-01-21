const Joi = require("joi");

const contactStatusSchema = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = contactStatusSchema;
