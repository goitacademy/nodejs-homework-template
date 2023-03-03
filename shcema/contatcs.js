const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  number: Joi.string().required(),
});

module.exports = contactSchema;
