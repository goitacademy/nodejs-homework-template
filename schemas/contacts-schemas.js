import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required name field`,
    "string.base": `name must be a string`,
  }),
  email: Joi.string().required(),
  phone: Joi.string().required().messages({
    "any.required": `missing required phone field`,
    "string.base": `phone must be a string`,
  }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});
