import Joi from "joi";
import { emailRegexp } from "../constants/user-constants.js";

const userSingupSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `missing required email or password field`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": `missing required password or email field`,
  }),
  subscription: Joi.string(),
});

const userLogInSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `missing required email or password field`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": `missing required password or email field`,
  }),
});

export default {
  userSingupSchema,
  userLogInSchema,
};
