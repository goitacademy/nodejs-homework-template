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

const userValidator = Joi.object({
	email: Joi.string().email({ tlds: true }).required(),
	password: Joi.string()
		.trim()
		.pattern(/^[a-zA-Z0-9]{3,30}$/)
		.required(),
});

const userValidateSubscription = Joi.object({
	subscription: Joi.string().valid('starter', 'pro', 'business'),
});

module.exports = {
	validateSchemaPost,
	validateSchemaPut,
	validateSchemaFavorite,
	userValidator,
	userValidateSubscription,
};
