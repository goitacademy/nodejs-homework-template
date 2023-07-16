const { HttpError } = require('../helpers');
const Joi = require('joi');

const contactAddSchema = Joi.object({
	name: Joi.string().required().messages({
		"any.required": "missing required name field"
	}),
	email: Joi.string().required().messages({
		"any.required": "missing required email field"
	}),
	phone: Joi.string().required().messages({
		"any.required": "missing required phone field"
	}),
});

const validateUpdContact = () => {
	const { name, email, phone } = req.body;
		if(!name && !email && !phone) throw HttpError(400, "missing fields")
		
		const { error } = contactAddSchema.validate(req.body)
		if (error) throw HttpError(400, error.message)
}

module.exports = {
	validateUpdContact,

}