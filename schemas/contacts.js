import Joi from "joi";

const contactsAddSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
	favorite: Joi.boolean(),
});
const contactUpdateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
});

export default { contactsAddSchema, contactUpdateFavoriteSchema };
