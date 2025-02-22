import Joi from "joi";

const subscribtionSchema = Joi.object({
    password: Joi.string(),
    email: Joi.string().email(),
    subscription: Joi.string().valid("starter", "pro", "business"),
    token: Joi.string(),
});

export default subscribtionSchema;