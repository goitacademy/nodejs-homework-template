const Joi = require("joi");
const customJoi = Joi.extend(require("joi-ext-phonenumber"));

const validation = (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string()
			.pattern(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/)
			.min(3)
			.max(20)
			.required()
			.messages({ "any.required": `missing required name field` }),
		email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
			.required()
			.messages({ "any.required": `missing required email field` }),
		phone: customJoi
			.string()
			.phoneNumber()
			.min(7)
			.max(20)
			.messages({ "any.required": `missing required phone field` }),
	});
	const result = schema.validate(req.body);
	if (result.error) {
		return res.status(400).json({ message: result.error.message });
	}

	next();
};
const validationPUT = (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string()
			.pattern(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/)
			.min(3)
			.max(20)
			.optional(),
		email: Joi.string()
			.email({
				minDomainSegments: 2,
				tlds: { allow: ["com", "net"] },
			})
			.optional(),
		phone: customJoi.string().phoneNumber().min(7).max(20).optional(),
	})
		.length(3)
		.messages({ "object.length": `missing field` });
	const result = schema.validate(req.body);
	if (result.error) {
		return res.status(400).json({ message: result.error.message });
	}

	next();
};

module.exports = {
	validation,
	validationPUT,
};
