const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().alphanum().max(22).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/, "numbers")
    .min(10)
    .max(12)
    .required(),
});

module.exports = contactSchema;
