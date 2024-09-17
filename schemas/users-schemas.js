import Joi from "joi";

// signup
const userRegisterSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	password: Joi.string().min(6).required(),
});

// signin
const userLoginSchema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().min(6).required(),
});
export default {
	userRegisterSchema,
	userLoginSchema,
};
