import Joi from 'joi';
import { subscriptionList, emailRegexp } from "../constants/user-constants.js";

const authSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required().messages({
        "any.required": `missing required "email" field`,
    }),
    password: Joi.string().min(6).required().messages({
        "any.required": 'missing required "password" field',
    }),
});

const emailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required().messages({
        "any.required": `missing required "email" field`,
    }),
});

const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid(...subscriptionList).required().messages({
        "any.required": 'missing required "subscription" field',
    }),
});

export default {
    authSchema,
    updateSubscriptionSchema,
    emailSchema,
};
