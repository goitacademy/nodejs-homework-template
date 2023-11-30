import Joi from "joi";
import { emailRegexp, subscriptionList } from "../constans/user-constans.js";

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Email format must be - example@example.com",
  }),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid(...subscriptionList),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Email format must be - example@example.com",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const subscriprionSchema = Joi.object({
  subscription: Joi.string().valid(...subscriptionList),
});

const updateAvatarSchema = Joi.object({
  payload: { files: Joi.array().items(Joi.any()) },
});

export default {
  registerSchema,
  emailSchema,
  loginSchema,
  subscriprionSchema,
  updateAvatarSchema,
};
