const Joi = require("joi");

module.exports = {
	contactValidation: (req, res, next) => {
		const schema = Joi.object({
			name: Joi.string().min(3).max(38).required(),
			email: Joi.string().email({
				minDomainSegments: 2,
				tlds: { allow: ["com", "net"] },
			}),
			phone: Joi.string().min(6).max(15).required(),
			favorite: Joi.boolean()
		});
		const validationResult = schema.validate(req.body);
		if (validationResult.error) {
			console.log(validationResult.error);
			return res.status(400).json({ message: "missing required name field" });
		}
		next();
	},
};
