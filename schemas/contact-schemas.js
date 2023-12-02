import Joi from "joi";

export const contactAddScheme = Joi.object({
  name: Joi.string().required().messages({
    "any.required": ` missing required "name" field`,
    "string.base": `"Name" must be text`,
  }),
  email: Joi.string().required().messages({
    "any.required": ` missing required "email" field`,
    "string.base": `"email" must be text`,
  }),
  phone: Joi.string().required().messages({
    "any.required": ` missing required "phone" field`,
    "string.base": `"phone" must be text`,
  }),
});

export const contactUpdateScheme = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});
