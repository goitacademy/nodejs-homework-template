import Joi from "joi";

const userAddSchema = Joi.object({
	name: Joi.string().min(3).max(30).required(),
	email: Joi.string().email({ minDomainSegments: 2 }).required(),
	phone: Joi.string()
		.min(8)
		.pattern(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/)
		.required(),
});

export default userAddSchema;
