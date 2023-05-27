const Joi = require("joi");

const phoneRegex =
  /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}$/;

const contactsValidation = Joi.object({
  name: Joi.string().min(3).max(35).required().messages({
    "any.required": "Missing required 'name' field",
    "string.min": "The length of 'name' must be between 3 and 35 characters",
    "string.max": "The length of 'name' must be between 3 and 35 characters",
  }),

  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "Missing required 'email' field" }),

  phone: Joi.string().pattern(new RegExp(phoneRegex)).required().messages({
    "any.required": "Missing required 'phone' field",
    "string.pattern.base":
      "The phone number format is incorrect. Please enter in the format +XX-XXX-XXX-XX-XX",
  }),
});

const updateStatusValidation = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing field favorite" }),
});

module.exports = { contactsValidation, updateStatusValidation };
