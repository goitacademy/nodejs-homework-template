import Joi from "joi";

import { emailRegexp } from "../constants/user-constants.js";

const userSignupSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const userSubscriptionUpdateSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

export default {
  userSignupSchema,
  userSigninSchema,
  userSubscriptionUpdateSchema,
};
