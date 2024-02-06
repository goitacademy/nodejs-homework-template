const joi = require("joi");

const newContactValidator = joi.object({
	name: joi
		.string()
		.regex(/^[a-zA-Z\s]+$/)
		.required(),

	email: joi
		.string()
		.email({
			minDomainSegments: 2,
		})
		.required(),

	phone: joi
		.string()
		.regex(/^[\d+\-()\s]{9,15}$/)
		.required(),
});

const updateContactValidator = joi.object({
	id: joi.string().required(),

	name: joi
		.string()
		.regex(/^[a-zA-Z\s]+$/)
		.required(),

	email: joi
		.string()
		.email({
			minDomainSegments: 2,
		})
		.required(),

	phone: joi
		.string()
		.regex(/^[\d+\-()\s]{9,15}$/)
		.required(),
});

module.exports = {
	newContactValidator,
	updateContactValidator,
};
