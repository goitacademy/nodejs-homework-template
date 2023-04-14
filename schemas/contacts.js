const Joi = require("joi");

const addShema = Joi.object({
	name: Joi.string().min(3).required().messages({
		"any.required": `"name" is required`,
	}),
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
		.required()
		.messages({
			"any.required": `"email" is required`,
		}),
	phone: Joi.string().min(1).max(15).required().messages({
		"any.required": `"phone" is required`,
	}),
});

module.exports = {
	addShema,
};
