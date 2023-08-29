const Joi = require('joi');

const contactSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email({ minDomainSegments: 2 }).required(),
	phone: Joi.string().required(),
	favorite: Joi.boolean(),
});

module.exports = contactSchema;