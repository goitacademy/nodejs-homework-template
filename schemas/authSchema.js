import Joi from "joi";
import { emailRegexp } from "../constants/user-constants.js";

const authSchema = Joi.object({
  email: Joi.string().regex(emailRegexp).lowercase().required().messages({
    "any.required": "Missing required email field",
    "string.empty": "Email field cannot be an empty string",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Missing required password field",
    "string.empty": "Password field cannot be an empty string",
  }),
});

export default authSchema;
