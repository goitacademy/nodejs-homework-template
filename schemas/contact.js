const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(10).required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
  email: Joi.string().email().required(),
});

module.exports = contactSchema;
