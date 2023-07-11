const Joi = require('joi');

const schema = Joi.object({
	name: Joi.string().required().messages({
		'any.required': 'Set name for contact',
	}),
	email: Joi.string().email().optional(),
	phone: Joi.string().optional(),
	favorite: Joi.boolean().default(false),
});

const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
});

module.exports = { schema, updateFavoriteSchema };
