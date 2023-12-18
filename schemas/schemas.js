import Joi from "joi";

export const contactAddScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

export const contactUpdateScheme = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});
