import Joi from "joi";

import { emailRegexp } from "../constants/user-constants.js";

const usersSignupSigninSchema = Joi.object({
   email: Joi.string().pattern(emailRegexp).required(),
   password: Joi.string().min(8).required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({
      'any.required': "Missing field 'subscription'",
    }),
});

export default {
   usersSignupSigninSchema,
   subscriptionSchema,
}
