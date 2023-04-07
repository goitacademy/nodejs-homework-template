const Joi = require("joi");

const dataValidator = (data) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().required(),
		phone: Joi.string().required(),
	});
	return schema.validate(data);
};

const IsEmptyObject = (data) => {
	const schema = Joi.object({
		name: Joi.string(),
		email: Joi.string(),
		phone: Joi.string(),
	}).min(1);
	console.log(schema.validate(data));

	return schema.validate(data);
};

module.exports = { IsEmptyObject, dataValidator };
