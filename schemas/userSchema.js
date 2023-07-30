import Joi from "joi";

const userSignupSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    subscription: Joi.string()
});

const userSigninSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

export default {
    userSignupSchema,
    userSigninSchema
}