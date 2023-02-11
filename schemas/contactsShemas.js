const Joi = require("joi");

const contactAddSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
	favorite: Joi.boolean(),
});

const contactUpdateStatusSchema = Joi.object({
	favorite: Joi.boolean().required(),
});

module.exports = {
	contactAddSchema,
	contactUpdateStatusSchema,
};
