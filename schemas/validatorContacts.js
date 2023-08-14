const joi = require('joi');

const addSchema = joi.object({
	name: joi.string().min(3).required(),
	email: joi.string().email().required(),
	phone: joi.string().min(5).required(),
});

module.exports = {
	addSchema,
}