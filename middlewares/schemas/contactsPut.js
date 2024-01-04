const Joi = require("joi");

const PutSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string().email(),
	phone: Joi.string(),
});

module.exports = PutSchema;
