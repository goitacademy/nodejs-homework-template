import Joi from "joi";

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

export const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export default {
  contactAddSchema,
  contactUpdateFavoriteSchema,
};
