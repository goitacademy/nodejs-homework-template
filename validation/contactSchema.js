const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .pattern(/^[A-Za-z\s]+$/, "numbers")
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/, "numbers")
    .required(),
});

module.exports = contactSchema;
