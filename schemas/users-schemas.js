import Joi from "joi";

const userSignupSchema = Joi.object({
  email: Joi.string().required().messages({
    "any.required": `"email" missing field`,
  }),
  password: Joi.string().required().messages({
    "any.required": `"password" missing field`,
  }),
  subscription: Joi.string(),
});

const userSigninSchema = Joi.object({
  email: Joi.string().required().messages({
    "any.required": `"email" missing field`,
  }),
  password: Joi.string().required().messages({
    "any.required": `"password" missing field`,
  }),
});

export default {
  userSignupSchema,
  userSigninSchema,
};
