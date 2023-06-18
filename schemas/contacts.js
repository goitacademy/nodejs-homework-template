const Joi = require("joi");

const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;

const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
  }),

  email: Joi.string().email({ tlds: false }).required().messages({
    "any.required": "missing required email field",
  }),

  phone: Joi.string()
    .pattern(phonePattern)
    .messages({
      "string.pattern.base": "Invalid phone number format.",
    })
    .required()
    .messages({
      "any.required": "missing required phone field",
    }),
});

module.exports = contactsAddSchema;
