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
		.optional(),
});

const updateContactValidator = joi.object({
	name: joi.string().regex(/^[a-zA-Z\s]+$/),

	email: joi.string().email({
		minDomainSegments: 2,
	}),
	phone: joi
		.string()
		.regex(/^[\d+\-()\s]{9,15}$/)
		.optional(),
});

module.exports = {
	newContactValidator,
	updateContactValidator,
};
