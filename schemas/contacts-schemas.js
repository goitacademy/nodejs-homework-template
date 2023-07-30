import Joi from "joi";

export const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" missing field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" missing field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" missing field`,
  }),
  favorite: Joi.boolean(),
});

export const contactsUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean(),
});
