import Joi from "joi";

export const contactAddScheme = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "string.required": "missing required name field" }),
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": "missing required phone field" }),
});

export const contactUpdateScheme = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});
