import Joi from "joi";

const authSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    subscription: Joi.string().valid("starter", "pro", "business"),
    token: Joi.string(),
});

export default authSchema;