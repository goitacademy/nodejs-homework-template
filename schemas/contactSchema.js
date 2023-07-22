const Joi = require("joi");
const dataRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;

const contactSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(40)
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .trim()
    .email()
    .required()
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .trim()
    .pattern(dataRegexp)
    .messages({
      messages:
        "Invalid phone number format. Please fill a valid phone number (000) 000-0000.",
    })
    .required()
    .messages({ "any.required": "missing required phone field" }),
  favorite: Joi.boolean(),
});

module.exports = { contactSchema, dataRegexp };
