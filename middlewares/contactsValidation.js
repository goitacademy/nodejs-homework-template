const Joi = require("joi");

const contactValidation = Joi.object({
  name: Joi.string()
    .pattern(/^\D+\s\D+$/)
    .trim()
    .messages({
      "string.pattern.base":
        "The name should consist of a first and a last name and numbers are not allowed",
    }),

  email: Joi.string()
    .email()
    .trim()
    .messages({ "string.email": "Invalid email" }),

  phone: Joi.string()
    .trim()
    .pattern(/^\W+\d{3}\W+\s\d+-*\d*$/)
    .messages({
      "string.pattern.base":
        "The phone number should contain a country code and a number: (xxx) xxx-xxx",
    }),

  favorite: Joi.boolean(),
});

module.exports = contactValidation;