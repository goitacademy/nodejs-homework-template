import Joi from "joi";

export const userSignupSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
});

export const userSigninSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
});

export const userUpdateSchema = Joi.object().keys({
  password: Joi.string().min(6),
  email: Joi.string(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});
