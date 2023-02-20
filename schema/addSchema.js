const Joi = require("joi");

const addSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email(),
	phone: Joi.string().length(10).regex(/^\d+$/).required(),
});

module.exports = addSchema;
