import Joi from "joi";
const registerNewUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
export { registerNewUserSchema };
