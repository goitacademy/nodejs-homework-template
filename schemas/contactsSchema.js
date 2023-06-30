const Joi = require('joi');

const contactSchema = Joi.object({
	name: Joi.string()
		.regex(/^[a-zA-Z0-9 ]*$/)
		.required()
		.messages({
			'any.required': 'Missing required name field',
			'string.regex': 'Invalid characters in name field'
		}),
	email: Joi.string()
		.email()
		.required()
		.messages({ 'any.required': 'Missing required email field' }),
	phone: Joi.string()
		.min(7)
		.max(14)
		.pattern(/^[0-9()-]+$/)
		.required()
		.messages({ 'any.required': 'Missing required phone field' })
});

module.exports = { contactSchema };
