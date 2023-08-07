import Joi from "joi";

export const userSignupSchema = Joi.object({
  email: Joi.string().required().messages({
    "any.required": `"email" missing field`,
  }),
  password: Joi.string().required().messages({
    "any.required": `"password" missing field`,
  }),
  subscription: Joi.string(),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().required().messages({
    "any.required": `"email" missing field`,
  }),
  password: Joi.string().required().messages({
    "any.required": `"password" missing field`,
  }),
});

export const updateUserAvatar = Joi.object({
  avatarURL: Joi.boolean(),
});
