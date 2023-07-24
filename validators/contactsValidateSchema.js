import Joi from "joi";

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
  favorite: Joi.boolean()
}) 

const contactsUpdateFavoriteSchema = Joi.object({
   favorite: Joi.boolean().required(),
})

export default {
  contactsSchema,
  contactsUpdateFavoriteSchema};
