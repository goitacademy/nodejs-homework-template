import Joi from "joi";

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.number().required(),
  favorite: Joi.boolean(),
});

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
export default {
  contactAddSchema,
  contactUpdateFavoriteSchema,
};
