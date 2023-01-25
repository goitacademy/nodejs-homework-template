const Joi = require("joi");
const contactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.required(),
  email: Joi.string().email().required()
});

module.exports = contactSchema;