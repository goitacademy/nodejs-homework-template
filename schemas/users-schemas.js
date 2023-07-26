import Joi from "joi";

const userRegisterSchema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().min(6).required(),
});
export default {
	userRegisterSchema,
};
