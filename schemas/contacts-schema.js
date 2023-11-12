import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Missing required name field",
    "string.base": "Name must be string",
  }),
  email: Joi.string().required().messages({
    "any.required": "Missing required email field",
    "string.base": "Email must be string",
  }),
  phone: Joi.string().required().messages({
    "any.required": "Missing required phone field",
    "string.base": "Phone must be string",
  }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().messages({
    "string.base": "Name must be string",
  }),
  email: Joi.string().messages({
    "string.base": "Email must be string",
  }),
  phone: Joi.string().messages({
    "string.base": "Phone must be string",
  }),
});
