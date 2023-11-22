import Joi from 'joi';

export const contactAddSchema = Joi.object({
	name: Joi.string().required().messages({
		'any.required': `"name" is a required field`,
		'string.base': `"name" should be a type of 'text'`,
	}),
	email: Joi.string().required().messages({
		'any.required': `"email" is a required field`,
		'string.base': `"email" should be a type of 'text'`,
	}),
	phone: Joi.string().required().messages({
		'any.required': `"phone" is a required field`,
		'string.base': `"string" should be a type of 'text'`,
	}),
	favorite: Joi.boolean().required().messages({
		'any.required': `"favorite" is a required field`,
	}),
});

export const contactUpdateById = Joi.object()
	.keys({
		name: contactAddSchema.extract('name').optional(),
		email: contactAddSchema.extract('email').optional(),
		phone: contactAddSchema.extract('phone').optional(),
		favorite: contactAddSchema.extract('favorite').optional(),
	})
	.or('name', 'email', 'phone');

export const contactFavoriteSchema = Joi.object().keys({
	favorite: contactAddSchema.extract('favorite'),
});
