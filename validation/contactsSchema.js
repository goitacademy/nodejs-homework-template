const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
  phone: Joi.string().min(10).max(15),
});

module.exports = contactSchema;
