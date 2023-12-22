import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required 'name' field",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "missing required 'email' field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "missing required 'phone' field",
  }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().alphanum(),
  email: Joi.string().email(),
  phone: Joi.string(),
});
