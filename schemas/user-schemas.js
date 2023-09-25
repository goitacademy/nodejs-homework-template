import Joi from "joi";

export const userSignupSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

export const userRefreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export const userUpdateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

export const userUpdateAvatarSchema = Joi.object({
  subscription: Joi.string(),
});

export default {
  userRefreshTokenSchema,
  userSignupSchema,
  userSigninSchema,
  userUpdateSubscriptionSchema,
  userUpdateAvatarSchema,
};
