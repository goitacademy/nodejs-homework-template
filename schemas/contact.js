const Joi = require("joi");

const contactSchema = Joi.object({
	// name: Joi.string().alphanum().min(3).max(30).required(),
	// email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
	// phone: Joi.string().pattern(/^\+380\d{9}$/),
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
});

module.exports = contactSchema;
