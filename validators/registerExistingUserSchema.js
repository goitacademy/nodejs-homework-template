import Joi from "joi";
const registerExistingUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
export { registerExistingUserSchema };
