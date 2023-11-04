import Joi from "joi";

const userJoiSchema = Joi.object({
  password: Joi.string().min(5).required(),
  email: Joi.string().email().min(5).max(30).required(),
});
