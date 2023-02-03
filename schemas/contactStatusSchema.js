const Joi = require("joi");

const contactStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { contactStatusSchema };
