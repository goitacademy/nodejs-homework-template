import Joi from "joi";

export const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "missing required email field",
  }),
  phone: Joi.string()
    .length(13)
    .pattern(/[0-9]?()+?[0-9]+$/)
    .required()
    .messages({
      "any.required": "missing required phone number field",
    }),
});

export const contactsUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string()
    .length(13)
    .pattern(/[0-9]?()+?[0-9]+$/),
});
