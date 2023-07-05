const Joi = require('joi');

const addSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	phone: Joi.string()
		.pattern(/^\d{10}$/)
		.required(),
});

const updateSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string().email(),
	phone: Joi.string().pattern(/^\d{10}$/),
});

module.exports = { addSchema, updateSchema };
