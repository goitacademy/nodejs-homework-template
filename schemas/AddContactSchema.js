const Joi = require("joi");

const { REGEXP } = require("../constants");

const addContactSchema = Joi.object({
	name: Joi.string().min(4).max(255).required(),
	email: Joi.string().min(4).max(255).pattern(REGEXP.email).required(),
	phone: Joi.string()
		.pattern(
			REGEXP.phone,
			"pattern: /\\d{3}-\\d{3}-\\d{4}/ example: 123-456-7890"
		)
		.required(),
});

module.exports = addContactSchema;