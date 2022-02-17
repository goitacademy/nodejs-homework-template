const Joi = require("joi");

const contactSchema = Joi.object({
  email: Joi.string().required(),
  name: Joi.string().required(),
  phone: Joi.number().required(),
});

module.exports = { contactSchema };
