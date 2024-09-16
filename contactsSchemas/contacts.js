const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().min(6).required().messages({
    "string.base": "name must be a string",
    "string.min": "name must be at least {#limit} characters long",
    "any.required": "missing required name field",
  }),
  email: Joi.string().min(6).required().messages({
    "string.base": "email must be a string",
    "string.min": "email must be at least {#limit} characters long",
    "any.required": "missing required email field",
  }),
  phone: Joi.string().min(6).required().messages({
    "string.base": "phone must be a string",
    "string.min": "phone must be at least {#limit} characters long",
    "any.required": "missing required phone field",
  }),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string()
});

module.exports = { contactAddSchema, contactUpdateSchema };
