const Joi = require('joi');

const validateSchemaPost = Joi.object({
	name: Joi.string().trim().min(2).max(30).required(),
	email: Joi.string().email({ tlds: true }).required(),
	phone: Joi.string()
		.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)
		.required(),
});

const validateSchemaPut = Joi.object({
	name: Joi.string().trim().min(2).max(30),
	email: Joi.string().email({ tlds: true }),
	phone: Joi.string().pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/),
});

const validateSchemaFavorite = Joi.object({
	favorite: Joi.boolean(),
});

module.exports = {
	validateSchemaPost,
	validateSchemaPut,
	validateSchemaFavorite,
};
