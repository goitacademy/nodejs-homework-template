import Joi from "joi";

export const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

export const contactsFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})
