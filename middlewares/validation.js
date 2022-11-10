const Joi = require("joi");
const customJoi = Joi.extend(require("joi-ext-phonenumber"));

const validation = (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string().alphanum().min(3).max(20).required(),
		email: Joi.string().email().required(),
		phone: customJoi.string().phoneNumber().min(7).max(20),
	});
	const result = schema.validate(req.body);
	console.log(result);
	if (result.error) {
		return res.status(400).json({ message: "missing required name field!" });
	}

	next();
};
const validationPUT = (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string().alphanum().min(3).max(20),
		email: Joi.string().email(),
		phone: customJoi.string().phoneNumber().min(7).max(20),
	});
	const result = schema.validate(req.body);
	console.log(result);
	if (result.error) {
		return res.status(400).json({ message: "missing required name field!" });
	}

	next();
};

module.exports = {
	validation,
	validationPUT,
};
