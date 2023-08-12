import Joi from "joi";

import { emailRegexp } from "../constants/user-constants.js";

const userSignupSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export default { userSignupSchema };
