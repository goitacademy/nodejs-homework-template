const Joi = require("joi");

const validationSchema = Joi.object({
	name: Joi.string()
		.min(2)
		.max(30)
		.pattern(/^[A-Za-z ]+$/)
		.messages({
			"string.pattern.base": "Invalid name. The name must contain only letters.",
			"any.required": `"name" is a required field`,
		})
		.required(),
	email: Joi.string()
		.email({ minDomainSegments: 2 })
		.messages({
			"string.pattern.base": "Invalid email. The email must be valid.",
			"any.required": `"email" is a required field`,
		})
		.required(),
	phone: Joi.string()
		.pattern(/^\(\d{3}\) \d{3}-\d{2}-\d{2}$/)
		.messages({
			"string.pattern.base": "Invalid phone number format. The format should be (XXX) XXX-XX-XX.",
			"any.required": `"phone" is a required field`,
		})
		.required(),
});

module.exports = validationSchema;
