import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "string.base": "Name should be a string",
    "string.min": "Name should be at least {#limit}",
    "string.max": "Name should be at most {#limit}",
  }),
  phoneNumber: Joi.string().min(10).max(13).required(),
  email: Joi.string().email().required().messages({
    "string.email": "Email is not valid",
  }),
  isFavourite: Joi.boolean().required(),
  contactType: Joi.string().valid("work", "home", "personal").required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    "string.base": "Name should be a string",
    "string.min": "Name should be at least {#limit}",
    "string.max": "Name should be at most {#limit}",
  }),
  phoneNumber: Joi.string().min(10).max(13),
  email: Joi.string().email().messages({
    "string.email": "Email is not valid",
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid("work", "home", "personal"),
});
