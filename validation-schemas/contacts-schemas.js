import Joi from "joi";

export const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": `missing required "name" field`,
    "string.base": `"name" should be a type of 'text'`,
    "string.min": `"name" should have a minimum length of {#limit}`,
  }),
  email: Joi.string().email().required().messages({
    "any.required": ` missing required "email" field`,
    "string.base": `"email" should be a type of 'text'`,
  }),
  phone: Joi.string().min(14).max(14).required().messages({
    "any.required": `missing required "phone" field`,
    "string.base": `"phone" should be a type of 'text'`,
    "string.min": `"name" should have a minimum length of {#limit}`,
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string().min(14).max(14),
});
