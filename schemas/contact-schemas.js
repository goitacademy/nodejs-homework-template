import Joi from "joi";

export const contactAddScheme = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"Name" missing required name field`,
    "string.base": `"Name" must be text`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" missing required name field`,
    "string.base": `"email" must be text`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" missing required name field`,
    "string.base": `"phone" must be text`,
  }),
});

export const contactUpdateScheme = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});
