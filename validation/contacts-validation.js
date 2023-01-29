const Joi = require("joi");

const contactSchema = Joi.object({
	name: Joi.string().required().messages({
		"any.required": "missing required name field!",
	}),
	email: Joi.string().email().required().messages({
		"any.required": "missing required email field!",
	}),
	phone: Joi.string().pattern(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/)
		.required().messages({
			"any.required": "missing required phone field!",
		}),
	favorite: Joi.bool(),
});

const updateContactSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string().email(),
	phone: Joi.string().pattern(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/),
	favorite: Joi.bool(),
});

module.exports = {
	contactSchema,
	updateContactSchema,
};