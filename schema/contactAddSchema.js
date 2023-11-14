import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" must be exist"`,
    "string.base": `"name" must be text"`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" must be exist"`,
    "string.base": `"email" must be text"`,
  }),
  phone: Joi.number().required().messages({
    "any.required": `"phone" must be exist"`,
    "number.base": `"phone" must be number"`,
  }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.number(),
});
