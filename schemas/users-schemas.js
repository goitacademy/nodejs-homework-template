import Joi from "joi";

import { emailRegexp } from "../constants/user-constants.js";

const usersSignupSigninSchema = Joi.object({
   email: Joi.string().pattern(emailRegexp).required(),
   password: Joi.string().min(8).required(),
});

export default usersSignupSigninSchema;