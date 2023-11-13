import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required "name"`,
    "string.base": `"name" must be string`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required "email"`,
    "string.base": `"email" must be string`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required "phone"`,
  }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});
