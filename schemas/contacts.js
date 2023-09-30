import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      "any.required": "missing required name field"
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "any.required": "missing required email field",
      "string.email": "Please provide a valid email address (e.g., example@example.com)",
    }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required()
    .messages({
      "any.required": "missing required phone field",
      "string.pattern.base": "Please provide a valid phone number (e.g., (123) 456-7890)",
    }),
}).with("name", ["email", "phone"]);


