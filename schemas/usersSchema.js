const Joi = require('joi');

const usersSchema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.messages({
			'string.email': 'Please enter a valid email address',
			'any.required': 'Email is required',
		}),

	password: Joi.string().min(6).required().messages({
		'string.min': 'Password should be at least 6 characters long',
		'any.required': 'Password is required',
	}),
});

const updateStatusSchema = Joi.object({
	subscription: Joi.string().valid('starter', 'pro', 'business').required().messages({
		'any.required': 'Subscription is required',
		'any.only': 'The subscription field must have a value of "starter", "pro", or "business"',
	}),
});

const resetVerifySchema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.messages({
			'string.email': 'Please enter a valid email address',
			'any.required': 'Email is required',
		}),
});

module.exports = { usersSchema, updateStatusSchema, resetVerifySchema };
