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
});

export const contactUpdateById = Joi.object({
	name: Joi.string(),
	email: Joi.string(),
	phone: Joi.string(),
});
