import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(20)
    .required()
    .pattern(new RegExp(/^[A-Za-z\s'-]+$/))
    .messages({
      "any.required": `missing required name field`,
      "string.pattern.base": `Name may contain only letters, apostrophe, dash, and spaces.`,
    }),
  email: Joi.string().email().required().messages({
    "any.required": `missing required email field`,
    "string.email":
      "Please provide a valid email address with at least two domain segments",
  }),
  phone: Joi.string()
    .required()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .messages({
      "any.required": `missing required phone field`,
      "string.pattern.base": `Phone number must be in the format (000) 000-0000`,
    }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(20)
    .pattern(new RegExp(/^[A-Za-z\s'-]+$/))
    .messages({
      "string.pattern.base": `Name may contain only letters, apostrophe, dash, and spaces.`,
    }),
  email: Joi.string().email().messages({
    "string.email":
      "Please provide a valid email address with at least two domain segments",
  }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .messages({
      "string.pattern.base": `Phone number must be in the format (000) 000-0000`,
    }),
});
