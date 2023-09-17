import Joi from "joi";

const contactSchema = Joi.object({
	name: Joi.string().min(3).max(30).required().messages({
		"any.required": "missing required name field",
	  }),
	email: Joi.string().required().messages({
		"any.required": "missing required email field",
	  }),
	phone: Joi.string().required().messages({
		"any.required": "missing required phone field",
	  }),
});

export default {
	contactSchema,
};




