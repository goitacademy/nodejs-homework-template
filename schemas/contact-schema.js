import Joi from "joi";

export const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "missing required email field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "missing required phone number field",
  }),
  favorite: Joi.boolean().required(),
});

export const contactsUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean().required(),
});

export const contactFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing field favorite" }),
});
