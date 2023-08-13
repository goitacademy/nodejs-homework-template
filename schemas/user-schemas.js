import Joi from "joi";

import { emailRegexp, subscriptionList } from "../constants/user-constants.js";

export const userSingUpAndSingInSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid(...subscriptionList),
});

export const updateSubscriptionStatusSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});

export default {
  userSingUpAndSingInSchema,
  updateSubscriptionStatusSchema,
};
