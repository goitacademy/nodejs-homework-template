import Joi from "joi";
import { emailRegExp } from "../constants/user-constants.js";

const userSignupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .pattern(emailRegExp)
    .required()
    .messages({ "any.required": "missing required field email" }),
  password: Joi.string().min(6).required(),
});

const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(6).required(),
});

const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
});

export default { userSigninSchema, userSignupSchema, userEmailSchema };
