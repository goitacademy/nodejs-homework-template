import Joi from "joi";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSignupSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string(),
});

const userSigninSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const userUpdateSubscriptionSchema = Joi.object({
  subscription: Joi.string().required().valid("starter", "pro", "business"),
});

export default {
  userSignupSchema,
  userSigninSchema,
  userUpdateSubscriptionSchema,
};