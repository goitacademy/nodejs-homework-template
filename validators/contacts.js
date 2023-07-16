import Joi from "joi";
import HttpError from "../helpers/HttpError.js";


const contactAddSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required()
})

const addContactValidation = (req, res, next) => {
	const { error } = contactAddSchema.validate(req.body);
	if (error) {
		throw HttpError(400, error.message)
	}
	return next()
}

export default addContactValidation