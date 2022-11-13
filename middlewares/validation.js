const Joi = require("joi");
const customJoi = Joi.extend(require("joi-ext-phonenumber"));

const validation = (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string()
			.pattern(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/)
			.min(3)
			.max(20)
			.required(),
		email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
			.required(),
		phone: customJoi.string().phoneNumber().min(7).max(20),
	});
	const result = schema.validate(req.body);
	const isRequire = result.error?.message.includes("required");
	if (isRequire) {
		return res.status(400).json({ message: "missing required name field" });
	}
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
	});
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
