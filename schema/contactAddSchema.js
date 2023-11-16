import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"missing required name field"`,
    "string.base": `"name" must be text"`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"missing required email field"`,
    "string.base": `"email" must be text"`,
  }),
  phone: Joi.number().required().messages({
    "any.required": `"missing required phone field"`,
    "number.base": `"phone" must be number"`,
  }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.number(),
});
