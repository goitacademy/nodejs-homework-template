const Joi = require('joi');

const usersRegisterSchema = Joi.object({
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

module.exports = { usersRegisterSchema };
